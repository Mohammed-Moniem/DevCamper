const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@Desc Get All Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@Desc Get Single Bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with an id of ${res.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@Desc Create new Bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

//@Desc Update new Bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    //To get the new data in the response
    new: true,
    runValidator: true
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with an id of ${res.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@Desc Delete Bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with an id of ${res.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: {} });
});
