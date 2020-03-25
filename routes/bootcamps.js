const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} = require("../controllers/bootcamps");
//Import Models
const Bootcamp = require("../models/Bootcamp");
const { protect, authorize } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");

//Include other resourse router
const courseRouter = require("./courses");

const router = express.Router();

//Re-route into other resourse routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publiser", "admin"), uploadBootcampPhoto);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publiser", "admin"), updateBootcamp)
  .delete(protect, authorize("publiser", "admin"), deleteBootcamp);

module.exports = router;
