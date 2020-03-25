const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@Desc   Register Users
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //   Create user
  const user = await User.create({ name, email, password, role });

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

//@Desc   Login Users
//@route  GET /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate Email and Password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide email and password`, 400));
  }

  //Check for user
  const user = await User.findOne({ email })
    //This is because we already set the select of password to false on the model level, and we wanted back for verifying login
    .select("+password");

  if (!user) {
    return next(new ErrorResponse(`Invalid email`, 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid password`, 401));
  }
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
