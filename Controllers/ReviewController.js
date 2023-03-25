const User = require("../Models/UserModel");
const Property = require("../Models/PropertyModel");
const Request = require("../Models/RequestModel");
const Review = require("../Models/ReviewModel");
const generateToken = require("../Utils/GenerateToken");
const {
  hashPassword,
  comparePassword,
} = require("../Utils/Password-Hash-Unhash");

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    const property = await Property.findOneAndUpdate(
      { _id: req.body.property_id },
      { $push: { reviews: newReview } }
    );

    const updatedProperty = await Property.findById(req.body.property_id);
    res.status(201).json({
      status: "Success",
      property: updatedProperty,
      review: newReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create review error: ${err}`,
    });
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(201).json({
      status: "Success",
      review,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get review error: ${err}`,
    });
  }
};
