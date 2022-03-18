const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
var cors = require("cors");

//Routes
const authRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const listRouter = require("./routes/listRoutes");

dotenv.config();
app.use(cors());
// Set security HTTP headers
app.use(helmet());

// // Limit requests from same API
// const limiter = rateLimit({
// 	max: 100,
// 	windowMs: 60 * 60 * 1000,
// 	message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();

	next();
});

//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.all("*", (req, res, next) => {
	res.send(404).json({
		data: `Can't find ${req.originalUrl} on this server!`,
	});
});

mongoose.connect(process.env.MONGO_URL).then(() => {
	console.log("DB connection established");
});

app.listen(process.env.PORT || 5000, () => {
	console.log("Welcome");
});
