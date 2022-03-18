const List = require("../models/List");

exports.createList = async (req, res) => {
	try {
		const newList = await List.create(req.body);
		res.status(201).json(newList);
	} catch (err) {
		res.status(404).json({
			status: "fail",
			err,
		});
	}
};

exports.getList = async (req, res) => {
	const typeQuery = req.query.type;
	const genreQuery = req.query.genre;
	let list = [];
	try {
		if (typeQuery) {
			if (genreQuery) {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery, genre: genreQuery } },
				]);
			} else {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery } },
				]);
			}
		} else {
			list = await List.aggregate([{ $sample: { size: 10 } }]);
		}
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.deletelist = async (req, res) => {
	try {
		await List.findByIdAndDelete(req.params.id);
		res.status(201).json("The list has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};
