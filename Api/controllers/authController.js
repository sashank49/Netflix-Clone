const User = require("../models/User");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.cookie("jwt", token, cookieOptions);

	// Remove password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.register = async (req, res) => {
	try {
		console.log("--------------------");
		console.log(req.body);
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		createSendToken(newUser, 201, res);
	} catch (err) {
		res.status(404).json({
			status: "fail",
			err,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		// 1) Check if email and password exist
		if (!email || !password) {
			return new error("Please provide email and password!");
		}
		// 2) Check if user exists && password is correct
		const user = await User.findOne({ email }).select("+password");
		console.log(user);
		if (!user || !(await user.correctPassword(password, user.password))) {
			return new error("Incorrect email or password");
		}

		// 3) If everything ok, send token to client
		createSendToken(user, 200, res);
	} catch (err) {
		res.status(404).json({
			status: "fail",
			err,
		});
	}
};

exports.protect = async (req, res, next) => {
	// 1) Getting token and check of it's there
	console.log("111111111111111111111111111111111");
	console.log(req.headers.token);
	let token;
	if (req.headers.token && req.headers.token.startsWith("Bearer")) {
		token = req.headers.token.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(
			new AppError("You are not logged in! Please log in to get access.", 401)
		);
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	console.log(decoded);
	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				"The user belonging to this token does no longer exist.",
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;

	next();
};
