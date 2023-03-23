const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  marital_status: {
    type: Boolean,
  },
  photo: {
    url: {
      type: String,
    },
  },
  is_host: {
    type: Boolean,
  },
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
    },
  ],
  purchase_history: [{ type: mongoose.Schema.Types.ObjectId, ref: "property" }],
  hosted_properties: [
    { type: mongoose.Schema.Types.ObjectId, ref: "property" },
  ],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "property" }],
});

module.exports = User = mongoose.model("user", userSchema);
