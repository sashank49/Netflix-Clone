const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.get("/find", userController.getUser);

router.use(userController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router.route("/stats").get(userController.getUserStats);


module.exports = router;
