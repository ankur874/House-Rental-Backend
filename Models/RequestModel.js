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
});

module.exports = Request = mongoose.model("request", RequestSchema);
