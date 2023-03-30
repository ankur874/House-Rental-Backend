const User = require("../Models/UserModel");
const Property = require("../Models/PropertyModel");
const Request = require("../Models/RequestModel");
const Review = require("../Models/ReviewModel");
const generateToken = require("../Utils/GenerateToken");
const {
  hashPassword,
  comparePassword,
} = require("../Utils/Password-Hash-Unhash");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409);
      throw new Error("User Email already Exists");
    }
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      user_id: newUser._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create new user error: ${err}`,
    });
  }
};

exports.getCurrentUserProfile = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.params.id })
      .populate("requests")
      .populate("purchase_history")
      .populate("saved")
      .populate("hosted_properties");
    currentUser.save();
    if (currentUser) {
      res.status(201).json({
        user: currentUser,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.updateUserprofile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    user.save();
    const updatedUser = await User.findOne({ _id: req.params.id });
    res.status(201).json({
      status: "Success",
      data: {
        token: generateToken(updatedUser._id),
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.authenticateUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await comparePassword(password, user.password))) {
      res.status(201).json({
        status: "Success",
        user_id: user._id,
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: `password does not match`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.addToFav = async (req, res, next) => {
  try {
    const { user_id, property_id } = req.body;

    const property = await Property.findById(property_id);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          saved: property,
        },
      }
    );
    user.save();
    const updatedUser = await User.findById(user_id);

    res.status(201).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to add to favorites: ${err}`,
    });
  }
};

exports.removefromfav = async (req, res, next) => {
  try {
    const { user_id, property_id } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { saved: property_id } }
    );
    user.save();
    const updatedUser = await User.findById(user_id);
    res.status(201).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to remove from cart: ${err}`,
    });
  }
};

exports.getSaved = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("saved");
    const savedList = user.saved;
    res.status(201).json({
      status: "Success",
      savedList,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to get saved : ${err}`,
    });
  }
};
