const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images/");
  },
  filename(req, file, cb) {
    cb(null, "tempraray");
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({
    name: "temp",
  });
});

module.exports = router;
