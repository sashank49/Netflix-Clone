const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please tell us your name!"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, "Please provide a valid email"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			select: false,
		},
		profilePic: { type: String, defaut: "" },
		isAdmin: { type: Boolean, default: false },
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
