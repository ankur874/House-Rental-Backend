const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
