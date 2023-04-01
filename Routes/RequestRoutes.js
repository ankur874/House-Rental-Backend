const express = require("express");
const requestController = require("../Controllers/RequestController");

const router = express.Router();

router.route("/").post(requestController.createRequest);

router.post(requestController.getRequest);

router.route("/:id").post(requestController.updateRequest);

module.exports = router;
