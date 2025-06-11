const Review = require("../models/reviewModel")
const School = require("../models/schoolModel")
const asyncHandler = require("express-async-handler")

// @desc    Get reviews
// @route   GET /api/reviews
// @route   GET /api/schools/:schoolId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  if (req.params.schoolId) {
    const reviews = await Review.find({ school: req.params.schoolId })

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
const getReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate({
    path: "school",
    select: "name description",
  })

  if (!review) {
    res.status(404)
    throw new Error(`Review not found with id of ${req.params.id}`)
  }

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc    Add review
// @route   POST /api/schools/:schoolId/reviews
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  req.body.school = req.params.schoolId
  req.body.user = req.user.id

  const school = await School.findById(req.params.schoolId)

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.schoolId}`)
  }

  const review = await Review.create(req.body)

  res.status(201).json({
    success: true,
    data: review,
  })
})

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  let review = await Review.findById(req.params.id)

  if (!review) {
    res.status(404)
    throw new Error(`Review not found with id of ${req.params.id}`)
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error("Not authorized to update this review")
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    res.status(404)
    throw new Error(`Review not found with id of ${req.params.id}`)
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error("Not authorized to delete this review")
  }

  await review.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

module.exports = {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
}
