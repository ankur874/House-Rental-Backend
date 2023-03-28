const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, "a");
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  // res.send(`/${req.file.path.replace(/\\/g, '/')}`);
  res.status(200).json({
    name: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

module.exports = router;
