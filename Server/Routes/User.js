const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");

router.post("/login", userController.login);

module.exports = router;
