const errorHandler = (err, req, res, next) => {
  //Log to console
  console.log(err.stack.red);
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Internal Server Error" });
};
module.exports = errorHandler;