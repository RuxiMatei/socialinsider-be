
const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.route("/get-brands").post(controller.getBrands);
router.route("/get-posts").post(controller.getPostsForAllProfiles);

module.exports = router;