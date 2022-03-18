const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
	try {
		const newMovie = await Movie.create(req.body);
		res.status(201).json(newMovie);
	} catch (err) {
		res.status(404).json({
			status: "fail",
			err,
		});
	}
};

exports.updateMovie = async (req, res) => {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedMovie);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.deleteMovie = async (req, res) => {
	try {
		await Movie.findByIdAndDelete(req.params.id);
		res.status(200).json("The movie has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getRandom = async (req, res) => {
	const type = req.query.type;
	let movie;
	try {
		if (type === "series") {
			movie = await Movie.aggregate([
				{ $match: { isSeries: true } },
				{ $sample: { size: 1 } },
			]);
		} else {
			movie = await Movie.aggregate([
				{ $match: { isSeries: false } },
				{ $sample: { size: 1 } },
			]);
		}
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json(err);
	}
};
exports.getAll = async (req, res) => {
	try {
		const movies = await Movie.find();
		res.status(200).json({
			length: movies.length,
			data: movies.reverse(),
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
