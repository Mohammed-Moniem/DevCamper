const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  //Log to console for development purposes
  console.log(err.stack.red);

  //mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `No BootCamp found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Internal Server Error" });
};
module.exports = errorHandler;
