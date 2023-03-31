const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  date: {
    type: String,
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
  is_pending: {
    type: Boolean,
    default: true,
  },
  is_accepted: {
    type: Boolean,
    default: false,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  guest_count: {
    type: Number,
  },
});

module.exports = Request = mongoose.model("request", RequestSchema);
