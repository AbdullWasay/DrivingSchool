const express = require("express")
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/userController")

const User = require("../models/userModel")

const router = express.Router()

const { protect, admin } = require("../middleware/authMiddleware")
const advancedResults = require("../middleware/advancedResults")

router.use(protect)
router.use(admin)

router.route("/").get(advancedResults(User), getUsers).post(createUser)

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
