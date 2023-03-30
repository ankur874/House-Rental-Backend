const express = require("express");
const propertyController = require("../Controllers/PropertyController");

const router = express.Router();

router
  .route("/")
  .post(propertyController.createProperty)
  .get(propertyController.getAllProperties);

router
  .route("/getPropertyByLocation")
  .post(propertyController.getPropertiesByLocation);

router.route("/:id").get(propertyController.getPropertyById);

module.exports = router;
