const School = require("../models/schoolModel")
const asyncHandler = require("express-async-handler")
const path = require("path")

// @desc    Get all schools
// @route   GET /api/schools
// @access  Public
const getSchools = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single school
// @route   GET /api/schools/:id
// @access  Public
const getSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id).populate([{ path: "services" }, { path: "reviews" }])

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.id}`)
  }

  res.status(200).json({
    success: true,
    data: school,
  })
})

// @desc    Create new school
// @route   POST /api/schools
// @access  Private
const createSchool = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id

  // Check for existing school
  const existingSchool = await School.findOne({ user: req.user.id })

  // If the user is not an admin, they can only add one school
  if (existingSchool && req.user.role !== "admin") {
    res.status(400)
    throw new Error(`The user with ID ${req.user.id} has already created a school`)
  }

  const school = await School.create(req.body)

  res.status(201).json({
    success: true,
    data: school,
  })
})

// @desc    Update school
// @route   PUT /api/schools/:id
// @access  Private
const updateSchool = asyncHandler(async (req, res) => {
  let school = await School.findById(req.params.id)

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.id}`)
  }

  // Make sure user is school owner or admin
  if (school.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to update this school`)
  }

  school = await School.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: school,
  })
})

// @desc    Delete school
// @route   DELETE /api/schools/:id
// @access  Private
const deleteSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id)

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.id}`)
  }

  // Make sure user is school owner or admin
  if (school.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to delete this school`)
  }

  await school.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Upload photo for school
// @route   PUT /api/schools/:id/photo
// @access  Private
const schoolPhotoUpload = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id)

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.id}`)
  }

  // Make sure user is school owner or admin
  if (school.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to update this school`)
  }

  if (!req.files) {
    res.status(400)
    throw new Error("Please upload a file")
  }

  const file = req.files.file

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    res.status(400)
    throw new Error("Please upload an image file")
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    res.status(400)
    throw new Error(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`)
  }

  // Create custom filename
  file.name = `photo_${school._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      res.status(500)
      throw new Error("Problem with file upload")
    }

    await School.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})

module.exports = {
  getSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
  schoolPhotoUpload,
}
