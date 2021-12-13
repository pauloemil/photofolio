const mongoose = require("mongoose");

const PhotographerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    bio: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    titles: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    active: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("Photographer", PhotographerSchema);
