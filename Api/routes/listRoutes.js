const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const listController = require("../controllers/listController");

router.use(authController.protect);

router.get("/", listController.getList);

router.use(userController.restrictTo("admin"));

router.post("/", listController.createList);
router.delete("/:id", listController.deletelist);

module.exports = router;
