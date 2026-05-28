


// const express = require("express");

// const router = express.Router();

// const {
//   createPayment,
//   checkPaymentStatus,
//   verifyPaymentDetails,
//   printApplicationDetails,
//   getRegistrationNumberDetails
// } = require("../controllers/paymentController");

// router.post("/create", createPayment);

// router.post("/status", checkPaymentStatus);

// router.post("/verify", verifyPaymentDetails);

// router.post("/print", printApplicationDetails);

// router.post("/registration-number", getRegistrationNumberDetails);

// module.exports = router;


const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post(
  "/create",
  paymentController.createPayment
);

router.post(
  "/status",
  paymentController.checkPaymentStatus
);

router.post(
  "/verify",
  paymentController.verifyPaymentDetails
);

router.post(
  "/print",
  paymentController.printApplicationDetails
);

router.post(
  "/registration-number",
  paymentController.getRegistrationNumberDetails
);

module.exports = router;