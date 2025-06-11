const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    features: {
      type: [String],
      required: true,
      enum: [
        "Theoriestunden",
        "Praxisstunden",
        "Intensivkurse",
        "Automatikgetriebe",
        "Schaltgetriebe",
        "Motorradführerschein",
        "LKW-Führerschein",
        "Bus-Führerschein",
        "Online-Buchung",
        "Mehrsprachige Fahrlehrer",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must can not be more than 5"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    pricing: {
      registrationFee: {
        type: Number,
        default: 0,
      },
      theoryLesson: {
        type: Number,
        default: 0,
      },
      practicalLesson: {
        type: Number,
        default: 0,
      },
      examFee: {
        type: Number,
        default: 0,
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create school slug from the name
SchoolSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().split(" ").join("-");
  next();
});

// Cascade delete services when a school is deleted
SchoolSchema.pre("remove", async function (next) {
  await this.model("Service").deleteMany({ school: this._id });
  next();
});

// Reverse populate with virtuals
SchoolSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "school",
  justOne: false,
});

SchoolSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "school",
  justOne: false,
});

module.exports = mongoose.model("School", SchoolSchema);
