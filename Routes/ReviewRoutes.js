const express = require("express");
const reviewController = require("../Controllers/ReviewController");

const router = express.Router();

router.route("/").post(reviewController.createReview);

router.route("/:id").get(reviewController.getReview);

module.exports = router;
