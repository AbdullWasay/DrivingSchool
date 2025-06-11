const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error(`User not found with id of ${req.params.id}`)
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    res.status(404)
    throw new Error(`User not found with id of ${req.params.id}`)
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error(`User not found with id of ${req.params.id}`)
  }

  await user.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}
