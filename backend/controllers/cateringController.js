import Catering from "../models/Catering.js";

/* ===========================
   GET ALL CATERING
=========================== */
export const getCatering = async (req, res) => {
  try {
    const { city } = req.query;

    let query = {};

    if (city) {
      query.city = new RegExp(`^${city}$`, "i");
    }

    const catering = await Catering.find(query);

    res.json({
      success: true,
      count: catering.length,
      data: catering,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   GET SINGLE CATERING
=========================== */
export const getSingleCatering = async (req, res) => {
  try {
    const catering = await Catering.findById(req.params.id);

    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering not found",
      });
    }

    res.json({
      success: true,
      data: catering,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   CREATE
=========================== */
export const createCatering = async (req, res) => {
  try {

    const catering = await Catering.create(req.body);

    res.status(201).json({
      success: true,
      message: "Catering created successfully",
      data: catering,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   UPDATE BASIC DETAILS
=========================== */
export const updateCatering = async (req, res) => {
  try {

    const catering = await Catering.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering not found",
      });
    }

    res.json({
      success: true,
      message: "Catering updated successfully",
      data: catering,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   DELETE
=========================== */
export const deleteCatering = async (req, res) => {
  try {

    const catering = await Catering.findByIdAndDelete(req.params.id);

    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering not found",
      });
    }

    res.json({
      success: true,
      message: "Catering deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   UPDATE MENU & LIMITS
=========================== */
export const updateMenu = async (req, res) => {
  try {

    const catering = await Catering.findById(req.params.id);

    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering not found",
      });
    }

    catering.menu = req.body.menu;
    catering.limits = req.body.limits;

    await catering.save();

    res.json({
      success: true,
      message: "Menu updated successfully",
      data: catering,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

