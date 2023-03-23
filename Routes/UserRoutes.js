const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

router.route("/").post(userController.createUser);

router.route("/login").post(userController.authenticateUser);

router
  .route("/profile/:id")
  .get(userController.getCurrentUserProfile)
  .post(userController.updateUserprofile);

router.route("/addtofav").post(userController.addToFav);
router.route("/removefromfav").post(userController.removefromfav);
