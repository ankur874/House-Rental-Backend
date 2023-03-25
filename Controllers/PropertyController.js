const User = require("../Models/UserModel");
const Property = require("../Models/PropertyModel");
const Request = require("../Models/RequestModel");
const Review = require("../Models/ReviewModel");
const generateToken = require("../Utils/GenerateToken");
const {
  hashPassword,
  comparePassword,
} = require("../Utils/Password-Hash-Unhash");

exports.createProperty = async (req, res, next) => {
  try {
    const newProperty = await Property.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $push: { hosted_properties: newProperty } }
    );
    user.save();
    const updatedUser = await User.findById(req.body.user_id);
    res.status(201).json({
      status: "Success",
      property: newProperty,
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create property error: ${err}`,
    });
  }
};

exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({}).populate("reviews");
    res.status(201).json({
      status: "Success",
      data: {
        properties,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get all properties error: ${err}`,
    });
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate("reviews");
    res.status(201).json({
      status: "Success",
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get order error: ${err}`,
    });
  }
};
exports.getPropertiesByLocation = async (req, res, next) => {
  try {
    const { city, country } = req.body;
    const property = await Property.find({
      $and: [{ city: city }, { country: country }],
    });
    res.status(201).json({
      status: "Success",
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get order error: ${err}`,
    });
  }
};
exports.getTopRatedProperties = async (req, res, next) => {
  try {
    const { city, country } = req.body;
    const property = await Property.find({
      $and: [{ city: city }, { country: country }],
    });
    property.sort((a, b) =>
      a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
    );
    res.status(201).json({
      status: "Success",
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get order error: ${err}`,
    });
  }
};
