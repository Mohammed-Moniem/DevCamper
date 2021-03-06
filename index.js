const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//Import Route Files
const auth = require("./routes/auth");
const users = require("./routes/users");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Load env variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Prevent NoSQL injections
app.use(mongoSanitize());

//Prevent XSS scripting
app.use(xss());

//Rate Limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 100
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable Cors
app.use(cors());

//Set security headers
app.use(helmet());

//Enable cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File Upload
app.use(fileupload());

//Set public to static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

//Handle unhandled promise rejections
//This is done to avoid rapping the async await process is db.js with a try-catch block or using .then()
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //Close server & exit process
  server.close(() => process.exit(1));
});
