const express = require("express")
const { getReviews, getReview, addReview, updateReview, deleteReview } = require("../controllers/reviewController")

const Review = require("../models/reviewModel")

const router = express.Router({ mergeParams: true })

const advancedResults = require("../middleware/advancedResults")
const { protect, admin } = require("../middleware/authMiddleware")

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "school",
      select: "name description",
    }),
    getReviews,
  )
  .post(protect, addReview)

router.route("/:id").get(getReview).put(protect, updateReview).delete(protect, deleteReview)

module.exports = router
