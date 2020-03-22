const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

//@Desc Get All Courses
//@route  GET /api/v1/courses
//@route  GET /api/v1/:bootcamp/courses
//@access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});
