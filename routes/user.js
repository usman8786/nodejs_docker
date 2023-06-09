const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");
const usersController = require("../controllers/usersController");

router.get("/get_all", usersController.getAllUsers);

module.exports = router;