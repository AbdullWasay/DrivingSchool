const User = require("../models/userModel")
const School = require("../models/schoolModel")
const Review = require("../models/reviewModel")
const asyncHandler = require("express-async-handler")

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
  const users = await User.countDocuments()
  const schools = await School.countDocuments()
  const reviews = await Review.countDocuments()

  // Get top rated schools
  const topSchools = await School.find().sort({ averageRating: -1 }).limit(5).select("name averageRating")

  // Get latest reviews
  const latestReviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate({
      path: "school",
      select: "name",
    })
    .populate({
      path: "user",
      select: "name",
    })

  res.status(200).json({
    success: true,
    data: {
      users,
      schools,
      reviews,
      topSchools,
      latestReviews,
    },
  })
})

// @desc    Add a school as admin
// @route   POST /api/admin/schools
// @access  Private/Admin
const addSchool = asyncHandler(async (req, res) => {
  // Check if user exists
  const user = await User.findById(req.body.user)

  if (!user) {
    res.status(404)
    throw new Error(`User not found with id of ${req.body.user}`)
  }

  // Create school
  const school = await School.create(req.body)

  res.status(201).json({
    success: true,
    data: school,
  })
})

module.exports = {
  getStats,
  addSchool,
}
