const express = require("express")
const {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers/serviceController")

const Service = require("../models/serviceModel")

const router = express.Router({ mergeParams: true })

const advancedResults = require("../middleware/advancedResults")
const { protect, admin, school } = require("../middleware/authMiddleware")

router
  .route("/")
  .get(
    advancedResults(Service, {
      path: "school",
      select: "name description",
    }),
    getServices,
  )
  .post(protect, school, addService)

router.route("/:id").get(getService).put(protect, school, updateService).delete(protect, school, deleteService)

module.exports = router
