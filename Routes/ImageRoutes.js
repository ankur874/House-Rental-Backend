const express = require("express");
const multer = require("multer");
const path = require("path");
const firebase = require("firebase/app");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} = require("firebase/storage");
const firebaseConfig = {
  apiKey: "AIzaSyAM2fiuJmnyo6QdodRHytuXWZxCIPJRLcA",
  authDomain: "house-rental-app-7d58a.firebaseapp.com",
  projectId: "house-rental-app-7d58a",
  storageBucket: "house-rental-app-7d58a.appspot.com",
  messagingSenderId: "638574780675",
  appId: "1:638574780675:web:48a9b36d16be63d41f0936",
  measurementId: "G-K1NYGR08V9",
};
const router = express.Router();
firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  const dateTime = getCurrentDateTime();
  const storageRef = ref(
    storage,
    `files/${req.file.originalname + " " + dateTime}`
  );
  const metaData = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metaData
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return res.status(200).json({
    status: "Success",
    name: req.file.originalname,
    downloadUrl: downloadUrl,
  });
});

function getCurrentDateTime() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const time = today.getHours() + "-" + today.getMinutes();
  return date + time;
}

module.exports = router;
