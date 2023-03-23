const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  total_rooms: {
    type: Number,
    required: true,
  },
  total_area: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  neighbourhood_detail: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  average_living_cost: {
    type: Number,
  },
  facilities: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  photos: [
    {
      url: {
        type: String,
      },
    },
  ],
});

module.exports = Property = mongoose.model("property", propertySchema);
