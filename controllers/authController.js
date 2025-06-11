const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    profilePicture,
    // School-specific fields
    schoolName,
    description,
    address,
    city,
    state,
    postalCode,
    website,
    foundedYear,
    instructors,
    vehicles,
    services,
    pricing,
    openingHours,
    logo,
    businessLicense,
    photos,
  } = req.body;

  // Create user data
  const userData = {
    name,
    email,
    password,
    role,
    phone,
  };

  // Add profile picture if provided
  if (profilePicture) {
    userData.profilePicture = {
      url: profilePicture,
      public_id: null, // Will be set if we store the public_id
    };
  }

  // If it's a school registration, add school-specific fields
  if (role === "fahrschule" || role === "school") {
    userData.schoolInfo = {
      schoolName,
      description,
      address,
      city,
      state,
      postalCode,
      website,
      foundedYear,
      instructors,
      vehicles,
      services,
      pricing,
      openingHours,
    };

    // Add media files
    if (logo) {
      userData.schoolInfo.logo = {
        url: logo,
        public_id: null,
      };
    }

    if (businessLicense) {
      userData.schoolInfo.businessLicense = {
        url: businessLicense,
        public_id: null,
      };
    }

    if (photos && photos.length > 0) {
      userData.schoolInfo.photos = photos.map((photoUrl) => ({
        url: photoUrl,
        public_id: null,
      }));
    }
  }

  // Create user
  const user = await User.create(userData);

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", { email, role: req.body.role });

  // Validate email & password
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and password");
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("User not found:", email);
    res.status(401);
    throw new Error("Invalid credentials");
  }

  console.log("User found:", { email: user.email, role: user.role });

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log("Password mismatch for:", email);
    res.status(401);
    throw new Error("Invalid credentials");
  }

  console.log("Login successful for:", email);
  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
const updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    res.status(401);
    throw new Error("Password is incorrect");
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("There is no user with that email");
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid token");
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const response = {
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      schoolInfo: user.schoolInfo,
      profilePicture: user.profilePicture,
    },
  };

  console.log("Sending token response:", {
    success: response.success,
    userRole: response.user.role,
    hasSchoolInfo: !!response.user.schoolInfo,
  });

  res.status(statusCode).json(response);
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
};
