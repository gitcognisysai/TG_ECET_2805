const express = require("express");
const axios = require("axios");

const {
  paymentCallback
} = require(
  "../controllers/sbiPaymentController"
);

const router = express.Router();

/*
|------------------------------------------------------------------
| SBI CALLBACK ROUTES
|------------------------------------------------------------------
*/

router.get(
  "/callback",
  paymentCallback
);

router.post(
  "/callback",
  paymentCallback
);

/*
|------------------------------------------------------------------
| SBI CONNECTION TEST
|------------------------------------------------------------------
*/

router.get(
  "/test-connection",
  async (req, res) => {

    try {

      const response =
        await axios.get(
          "https://integration.sbiepay.sbiuat.bank.in/merchantintegration/",
          {
            timeout: 15000
          }
        );

      return res.status(200).json({

        success: true,

        message:
          "SBI reachable",

        status:
          response.status

      });

    }

    catch (error) {

      return res.status(500).json({

        success: false,

        error:
          error.message

      });

    }

  }
);

module.exports = router;
