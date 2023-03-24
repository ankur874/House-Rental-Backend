const express = require("express");
const requestController = require("../Controllers/RequestController");

const router = express.Router();

router.route("/").post(requestController.createRequest);

router.route("/:id").get(requestController.getRequest);

router.route("/updaterequest").post(requestController.updateRequest);

module.exports = router;
