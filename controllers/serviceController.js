const Service = require("../models/serviceModel")
const School = require("../models/schoolModel")
const asyncHandler = require("express-async-handler")

// @desc    Get services
// @route   GET /api/services
// @route   GET /api/schools/:schoolId/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  if (req.params.schoolId) {
    const services = await Service.find({ school: req.params.schoolId })

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).populate({
    path: "school",
    select: "name description",
  })

  if (!service) {
    res.status(404)
    throw new Error(`Service not found with id of ${req.params.id}`)
  }

  res.status(200).json({
    success: true,
    data: service,
  })
})

// @desc    Add service
// @route   POST /api/schools/:schoolId/services
// @access  Private
const addService = asyncHandler(async (req, res) => {
  req.body.school = req.params.schoolId
  req.body.user = req.user.id

  const school = await School.findById(req.params.schoolId)

  if (!school) {
    res.status(404)
    throw new Error(`School not found with id of ${req.params.schoolId}`)
  }

  // Make sure user is school owner or admin
  if (school.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to add a service to this school`)
  }

  const service = await Service.create(req.body)

  res.status(201).json({
    success: true,
    data: service,
  })
})

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
  let service = await Service.findById(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error(`Service not found with id of ${req.params.id}`)
  }

  // Make sure user is service owner or admin
  if (service.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to update this service`)
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: service,
  })
})

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error(`Service not found with id of ${req.params.id}`)
  }

  // Make sure user is service owner or admin
  if (service.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401)
    throw new Error(`User ${req.user.id} is not authorized to delete this service`)
  }

  await service.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

module.exports = {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
}
