const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

//Import Middleware
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getCourses)
  .post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publiser", "admin"), updateCourse)
  .delete(protect, authorize("publiser", "admin"), deleteCourse);

module.exports = router;
