const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a service name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: [
      "Theorie",
      "Praxis",
      "Prüfungsvorbereitung",
      "Spezialausbildung",
      "Sonstiges",
    ],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  duration: {
    type: Number,
    required: [true, "Please add a duration in minutes"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
