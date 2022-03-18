const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.use(authController.protect);

router.get("/find/:id", movieController.getMovie);
router.get("/random", movieController.getRandom);

router.use(userController.restrictTo("admin"));

router.get("/", movieController.getAll);

router.route("/").post(movieController.createMovie);

router
	.route("/:id")
	.patch(movieController.updateMovie)
	.delete(movieController.deleteMovie);

module.exports = router;
