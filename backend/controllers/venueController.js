import Venue from "../models/Venue.js";

//
// GET ALL VENUES
//
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CREATE VENUE
//
export const createVenue = async (req, res) => {
  try {
    const {
      name,
      city,
      cover,
      price,
      decorLevel,
      subCards,
    } = req.body;

    if (
      !name ||
      !city ||
      !cover ||
      !price ||
      !decorLevel
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const venue = await Venue.create({
      name,
      city,
      cover,
      price,
      decorLevel,
      subCards,
    });

    res.status(201).json({
      success: true,
      message: "Venue created successfully.",
      data: venue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// UPDATE VENUE
//
export const updateVenue = async (req, res) => {
  try {

    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venue updated successfully.",
      data: venue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// DELETE VENUE
//
export const deleteVenue = async (req, res) => {
  try {

    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    await venue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};