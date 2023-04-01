const express = require("express");
const requestController = require("../Controllers/RequestController");

const router = express.Router();

router.route("/").post(requestController.createRequest);

router.route("/getrequest").post(requestController.getRequest);

router.route("/:id").post(requestController.updateRequest);
router.route("/getuserrequest/:id").get(requestController.getRequestWithID);

module.exports = router;
