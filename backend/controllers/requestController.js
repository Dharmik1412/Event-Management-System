import EventRequest from "../models/EventRequest.js";

//
// CREATE REQUEST
//
export const createRequest = async (req, res) => {
  try {
    const {
      eventType,
      city,
      eventDate,
      guests,
      venueStatus,
      eventDetails,
      requirements,
    } = req.body;

    const customerId = req.user._id;

    if (!city || !eventDate || !guests || !venueStatus) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const request = await EventRequest.create({
      customerId,
      eventType,
      city,
      eventDate,
      guests,
      venueStatus,
      eventDetails,
      requirements,
    });

    res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: request,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ADMIN - GET ALL REQUESTS
//
export const getRequests = async (req, res) => {
  try {
    const requests = await EventRequest.find()
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CUSTOMER - GET MY REQUESTS
//
export const getMyRequests = async (req, res) => {
  try {
    const requests = await EventRequest.find({
      customerId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ADMIN - UPDATE STATUS
//
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Quoted", "Completed", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin status",
      });
    }

    const request = await EventRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = status;

    await request.save();

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ADMIN - SEND QUOTATION
//
export const sendQuotation = async (req, res) => {
  try {
    const { quotationAmount, quotationNotes } = req.body;

    const request = await EventRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Quotation already sent.",
      });
    }

    request.quotationAmount = quotationAmount;
    request.quotationNotes = quotationNotes;
    request.status = "Quoted";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Quotation sent successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CUSTOMER - APPROVE QUOTATION
//
export const approveQuotation = async (req, res) => {
  try {
    const request = await EventRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (request.status !== "Quoted") {
      return res.status(400).json({
        success: false,
        message: "Quotation not available.",
      });
    }

    request.status = "Approved";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Quotation approved.",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CUSTOMER - REJECT QUOTATION
//
export const rejectQuotation = async (req, res) => {
  try {
    const request = await EventRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (request.status !== "Quoted") {
      return res.status(400).json({
        success: false,
        message: "Quotation not available.",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Quotation rejected.",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalRequests = await EventRequest.countDocuments();

    const pending = await EventRequest.countDocuments({
      status: "Pending",
    });

    const quoted = await EventRequest.countDocuments({
      status: "Quoted",
    });

    const approved = await EventRequest.countDocuments({
      status: "Approved",
    });

    const rejected = await EventRequest.countDocuments({
      status: "Rejected",
    });

    const revenueData = await EventRequest.find({
      status: "Approved",
    });

    const revenue = revenueData.reduce(
      (sum, item) => sum + (item.quotationAmount || 0),
      0
    );

    res.json({
      totalRequests,
      pending,
      quoted,
      approved,
      rejected,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};