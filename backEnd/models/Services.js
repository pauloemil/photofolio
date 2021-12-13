const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    background: {
      type: String,
      default: "",
    },
    words: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhotographyAgency",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Services", ServicesSchema);
