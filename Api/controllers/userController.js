const User = require("../models/User");
const bcrypt = require("bcryptjs");

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.updateMe = async (req, res) => {
	try {
		// 1) Create error if user POSTs password data
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 12);
		}

		// 2) Filtered out unwanted fields names that are not allowed to be updated
		const filteredBody = filterObj(req.body, "username", "email");

		const filteredBody1 = { ...filteredBody, password: req.body.password };

		// 3) Update user document
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			filteredBody1,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: "success",
			data: {
				user: updatedUser,
			},
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.deleteMe = async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.user.id, { active: false });

		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		console.log(user);
		res.status(201).json({
			status: "success",
			data: user,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='user'

		if (!req.user.isAdmin) {
			res.status(404).json({
				message: "You do not have permission to perform this action",
			});
		}

		next();
	};
};

exports.getAllUsers = async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getUserStats = async (req, res) => {
	console.log(1111111111111111111111);
	const today = new Date();
	const latYear = today.setFullYear(today.setFullYear() - 1);

	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
};
