const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["benutzer", "fahrschule", "school", "admin"],
    default: "benutzer",
  },
  phone: {
    type: String,
  },
  profilePicture: {
    url: String,
    public_id: String,
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String,
  },
  // School-specific information (for fahrschule role)
  schoolInfo: {
    schoolName: String,
    description: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    website: String,
    foundedYear: Number,
    instructors: Number,
    vehicles: Number,
    services: {
      carLicense: { type: Boolean, default: false },
      motorcycleLicense: { type: Boolean, default: false },
      truckLicense: { type: Boolean, default: false },
      busLicense: { type: Boolean, default: false },
      mopedLicense: { type: Boolean, default: false },
      refresherCourses: { type: Boolean, default: false },
      intensiveCourses: { type: Boolean, default: false },
      automaticTransmission: { type: Boolean, default: false },
      onlineTheory: { type: Boolean, default: false },
      anxietySupport: { type: Boolean, default: false },
      foreignLanguageSupport: { type: Boolean, default: false },
    },
    pricing: {
      registrationFee: Number,
      theoryLesson: Number,
      practicalLesson: Number,
      examFee: Number,
    },
    openingHours: {
      monday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      tuesday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      wednesday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      thursday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      friday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      saturday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false },
      },
      sunday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: true },
      },
    },
    logo: {
      url: String,
      public_id: String,
    },
    businessLicense: {
      url: String,
      public_id: String,
    },
    photos: [
      {
        url: String,
        public_id: String,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
