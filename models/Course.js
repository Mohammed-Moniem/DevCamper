const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course name"]
  },
  description: {
    type: String,
    required: [true, "Please add description"]
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add number of weeks"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add number of weeks"],
    enum: ["begginer", "intermediate", "advanced"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

// Static method to get average of course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  console.log(`Calculating avg cost...`.green.bold.underline);
  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId
      },
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  console.log(obj);
};

//Call getAverageCost after save
CourseSchema.post("save", function() {});

//Call getAverageCost before save
CourseSchema.pre("remove", function() {});

module.exports = mongoose.model("Course", CourseSchema);
