import Decoration from "../models/Decoration.js";

// GET ALL
export const getDecorations = async (req, res) => {
  try {
    const { city } = req.query;

    const decorations = city
      ? await Decoration.find({
          city: { $regex: new RegExp(`^${city}$`, "i") },
        })
      : await Decoration.find();

    res.json({
      success: true,
      count: decorations.length,
      data: decorations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CREATE
export const createDecoration = async (req, res) => {
  try {
    const decoration = await Decoration.create(req.body);

    res.status(201).json({
      success: true,
      data: decoration,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updateDecoration = async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: decoration,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deleteDecoration = async (req, res) => {
  try {
    await Decoration.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Decoration deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};