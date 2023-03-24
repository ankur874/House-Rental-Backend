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
});

module.exports = Request = mongoose.model("request", RequestSchema);
