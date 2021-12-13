const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      lowercase: true,
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhotographyAgency",
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Images", ImagesSchema);
