const express = require("express");
const router = express.Router();

const ToughtController = require("../controllers/ToughtControllers");

const checkAuth = require("../helpers/auth");

router.get("/", ToughtController.showToughts);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.get("/add", checkAuth, ToughtController.createTought);
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
router.post("/edit", checkAuth, ToughtController.updateToughtSave);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.post("/remove", checkAuth, ToughtController.removeTought);

module.exports = router;
