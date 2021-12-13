const mongoose = require("mongoose");

const PhotographyAgencySchema = mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    information: {
      publicEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },
      whatsapp: {
        type: String,
        trim: true,
      },
      telegram: {
        type: String,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      workingCities: [
        {
          type: String,
          trim: true,
          lowercase: true,
        },
      ],
    },
    pages: {
      aboutPage: {
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
      },
      servicesPage: {
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
      },
      recentWorkPage: {
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
      },
      portfolioPage: {
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
      },
      contactPage: {
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
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PhotographyAgency", PhotographyAgencySchema);
