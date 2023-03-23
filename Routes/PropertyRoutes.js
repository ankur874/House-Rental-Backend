const express = require("express");
const propertyController = require("../Controllers/PropertyController");

const router = express.Router();

router
  .route("/")
  .post(propertyController.createProperty)
  .get(propertyController.getAllProperties);

router
  .route("/getPropertyByLocation")
  .get(propertyController.getPropertiesByLocation);

router
  .route("/getTopRatedProperties")
  .get(propertyController.getTopRatedProperties);

router.route("/:id").get(propertyController.getPropertyById);

module.exports = router;
