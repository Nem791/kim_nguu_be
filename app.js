var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Add this line
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load env based on NODE_ENV
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reservationRouter = require("./routes/reservationRoutes");
var adminAuthRouter = require("./routes/adminAuth");
const connectDB = require("./config/db");

var app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
});

// DB connection
connectDB();

app.use(logger("dev"));

// app.use(cors()); // ✅ Enable CORS for all routes
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN, // must be explicit
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(limiter);
app.disable("x-powered-by");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reservations", reservationRouter);
app.use("/admin", adminAuthRouter);

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
