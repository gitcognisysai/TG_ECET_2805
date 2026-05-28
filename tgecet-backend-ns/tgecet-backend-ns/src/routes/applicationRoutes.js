const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer();

const {
  createApplication
} = require("../controllers/applicationController");

router.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 }
  ]),
  createApplication
);

module.exports = router;