const express = require("express")
const {
  getSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
  schoolPhotoUpload,
} = require("../controllers/schoolController")

const School = require("../models/schoolModel")

// Include other resource routers
const serviceRouter = require("./serviceRoutes")
const reviewRouter = require("./reviewRoutes")

const router = express.Router()

const advancedResults = require("../middleware/advancedResults")
const { protect, admin, school } = require("../middleware/authMiddleware")

// Re-route into other resource routers
router.use("/:schoolId/services", serviceRouter)
router.use("/:schoolId/reviews", reviewRouter)

router.route("/").get(advancedResults(School, "services"), getSchools).post(protect, createSchool)

router.route("/:id").get(getSchool).put(protect, updateSchool).delete(protect, deleteSchool)

router.route("/:id/photo").put(protect, schoolPhotoUpload)

module.exports = router
