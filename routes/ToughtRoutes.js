const express = require("express");
const router = express.Router();

const ToughtController = require("../controllers/ToughtControllers");

const checkAuth = require("../helpers/auth");

router.get("/", ToughtController.showToughts);
router.get("/dashboard", checkAuth, ToughtController.dashboard);

module.exports = router;
