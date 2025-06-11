const express = require("express")
const { getStats, addSchool } = require("../controllers/adminController")

const router = express.Router()

const { protect, admin } = require("../middleware/authMiddleware")

router.use(protect)
router.use(admin)

router.get("/stats", getStats)
router.post("/schools", addSchool)

module.exports = router
