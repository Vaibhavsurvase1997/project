const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Address: [
    {
      Address_id: { type: Number },
      address: { type: String },
      pincode: { type: Number },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],
});
module.exports = mongoose.model("register", RegisterSchema);
