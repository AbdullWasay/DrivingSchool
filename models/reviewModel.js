const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title for the review"],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please add a rating between 1 and 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    school: {
      type: mongoose.Schema.ObjectId,
      ref: "School",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Prevent user from submitting more than one review per school
ReviewSchema.index({ school: 1, user: 1 }, { unique: true })

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (schoolId) {
  const obj = await this.aggregate([
    {
      $match: { school: schoolId },
    },
    {
      $group: {
        _id: "$school",
        averageRating: { $avg: "$rating" },
      },
    },
  ])

  try {
    await this.model("School").findByIdAndUpdate(schoolId, {
      averageRating: obj[0] ? obj[0].averageRating : 0,
    })
  } catch (err) {
    console.error(err)
  }
}

// Call getAverageRating after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.school)
})

// Call getAverageRating before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.school)
})

module.exports = mongoose.model("Review", ReviewSchema)
