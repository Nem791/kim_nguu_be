var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Add this line

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reservationRouter = require("./routes/reservationRoutes");
const connectDB = require("./config/db");

// Load env based on NODE_ENV
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

var app = express();

// DB connection
connectDB();

app.use(logger("dev"));
app.use(cors()); // ✅ Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reservations", reservationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
