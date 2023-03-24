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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  kitchens: {
    type: Number,
    required: true,
  },
  infants: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  is_sold: {
    type: Boolean,
    default: false,
  },
  rent_start_date: {
    type: String,
  },
  rent_end_date: {
    type: String,
  },
  total_area: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  property_type: {
    type: String,
  },
  rentOrBuy: {
    type: String,
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
