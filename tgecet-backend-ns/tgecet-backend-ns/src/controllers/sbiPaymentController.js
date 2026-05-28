const sbiClient =
  require("../config/sbiClient");
const {
  generateChecksum
} = require("../services/sbiPaymentService");
const {
  updatePaymentStatus
} = require(
  "../services/paymentService"
);


const initiatePayment = async (req, res) => {

  console.log("=================================");
  console.log("SBI INITIATE PAYMENT API HIT");
  console.log("REQUEST BODY:");
  console.log(req.body);
  console.log("=================================");

  try {
const {

 

  isLateFee,

  qualifyingExam,

  hallTicketNo,

  branchDiploma,

  branchEntrance,

  passingYear,

  candidateName,

  dob,

  mobile,

  alternateMobile,

  email,

  category,

  phStatus,

  paymentMode

} = req.body;
const paymentRef =
  `TGECET${Date.now()}`;
  let finalAmount = 0;

// ======================
// CATEGORY FEE
// ======================

if (
  category === "OC" ||
  category.startsWith("BC")
) {
  finalAmount = 900;
}

else if (
  category.startsWith("SC") ||
  category === "ST"
) {
  finalAmount = 500;
}

// ======================
// PH CONCESSION
// ======================

if (phStatus === "YES") {
  finalAmount = 0;
}

// ======================
// LATE FEE
// ======================

if (isLateFee) {
  finalAmount += 500;
}

    console.log("AMOUNT:");
    console.log(finalAmount);

    console.log("PAYMENT REF:");
    console.log(paymentRef);

    console.log("CANDIDATE NAME:");
    console.log(candidateName);

    console.log("EMAIL:");
    console.log(email);

    console.log("MOBILE:");
    console.log(mobile);

    const payload =
`${paymentRef}|${finalAmount}|${mobile}`;

    console.log("GENERATED PAYLOAD:");
    console.log(payload);

    const checksum = generateChecksum(
      payload,
      process.env.SBI_SECRET_KEY
    );

    console.log("GENERATED CHECKSUM:");
    console.log(checksum);

    const paymentData = {

      merchantId: process.env.SBI_MERCHANT_ID,

      paymentRef,

      amount: finalAmount,

      candidateName,

      email,

      mobile,

      returnUrl: process.env.SBI_RETURN_URL,

      checksum
    };

    console.log("FINAL SBI PAYMENT DATA:");
    console.log(paymentData);

    console.log("SENDING SBI PAYMENT RESPONSE");

    res.status(200).json({
      success: true,
      paymentUrl: process.env.SBI_TEST_URL,
      paymentData
    });

  } catch (error) {

    console.log("SBI INITIATE PAYMENT ERROR");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
const paymentCallback =
async (req, res) => {

  console.log("=================================");
  console.log("SBI CALLBACK RECEIVED");
  console.log("=================================");

  console.log("REQ BODY =>");
  console.log(req.body);

  console.log("REQ QUERY =>");
  console.log(req.query);

  console.log("REQ PARAMS =>");
  console.log(req.params);

  console.log("REQ HEADERS =>");
  console.log(req.headers);

  console.log(
    "encryptedPaymentFinalResponse =>"
  );

  console.log(
    req.query.encryptedPaymentFinalResponse
  );

  console.log("=================================");

  try {

    /*
    |--------------------------------------------------------------------------
    | GET ENCRYPTED RESPONSE
    |--------------------------------------------------------------------------
    */

    // const encryptedResponse =
    //   req.query
    //     .encryptedPaymentFinalResponse;
  //   const encryptedResponse =
  // req.body.encryptedPaymentFinalResponse ||
  // req.query.encryptedPaymentFinalResponse ||
  // req.body.encData ||
  // req.query.encData ||
  // req.body.data ||
  // req.query.data;

  //   console.log(
  //     "ENCRYPTED SBI RESPONSE =>"
  //   );

  //   console.log(
  //     encryptedResponse
  //   );


  const encryptedResponse =
  req.body?.encryptedPaymentFinalResponse ||
  req.query?.encryptedPaymentFinalResponse ||
  req.body?.encData ||
  req.query?.encData ||
  req.body?.data ||
  req.query?.data;

console.log(
  "ENCRYPTED SBI RESPONSE =>"
);

console.log(
  encryptedResponse
);

if (!encryptedResponse) {

  console.log("NO ENCRYPTED RESPONSE RECEIVED");

  return res.status(400).json({
    success: false,
    message: "No encrypted response received"
  });

}

    /*
    |--------------------------------------------------------------------------
    | DECRYPT SBI RESPONSE
    |--------------------------------------------------------------------------
    */

    // const decryptedResponse =
    //   await sbiClient.crypto.decrypt(
    //     encryptedResponse
    //   );
    let decryptedResponse;

try {

  // decryptedResponse =
  //   await sbiClient.crypto.decrypt(
  //     encryptedResponse
  //   );
  // const decodedResponse =
  // decodeURIComponent(
  //   encryptedResponse
  // );
  let decodedResponse =
  encryptedResponse;

try {

  decodedResponse =
    decodeURIComponent(
      encryptedResponse
    );

}

catch (decodeError) {

  console.log(
    "DECODE ERROR =>"
  );

  console.log(
    decodeError
  );

}

console.log(
  "DECODED RESPONSE =>"
);

console.log(
  decodedResponse
);

// decryptedResponse =
//   await sbiClient.crypto.decrypt(
//     decodedResponse
//   );

decryptedResponse =
  await sbiClient.crypto.decodeCallback(
    decodedResponse
  );
}

catch (decryptError) {

  console.log(
    "DECRYPT ERROR =>"
  );

  // console.log(
  //   decryptError
  // );
  console.log(
  "FULL DECRYPT ERROR =>"
);

console.log(
  decryptError
);

console.log(
  decryptError.message
);

console.log(
  decryptError.stack
);

  return res.status(500).json({

    success: false,

    message:
      "SBI decrypt failed",

    error:
      decryptError.message

  });

}

    console.log(
      "DECRYPTED RESPONSE =>"
    );

    console.log(
      JSON.stringify(
        decryptedResponse,
        null,
        2
      )
    );
//     return res.status(200).json(
//   decryptedResponse
// );
console.log(
  "FULL DECRYPTED RESPONSE =>"
);

console.log(
  JSON.stringify(
    decryptedResponse,
    null,
    2
  )
);

// return res.send(
//   "<h1>CHECK PM2 LOGS</h1>"
// );

    /*
    |--------------------------------------------------------------------------
    | EXTRACT SBI DATA
    |--------------------------------------------------------------------------
    */

    // const sbiResponse =
    //   decryptedResponse.data[0];
    console.log(
  "FULL DECRYPTED RESPONSE =>"
);

console.log(
  JSON.stringify(
    decryptedResponse,
    null,
    2
  )
);

// const sbiResponse =

//   decryptedResponse?.data?.[0]

//   ||

//   decryptedResponse?.data

//   ||

//   decryptedResponse;

//     // const paymentRef =
//     //   sbiResponse.merchantOrderNumber ||
//     //   sbiResponse.orderRefNumber;
//     const paymentRef =

//   sbiResponse?.merchantOrderNumber

//   ||

//   sbiResponse?.orderRefNumber

//   ||

//   sbiResponse?.merchantTxnNo

//   ||

//   sbiResponse?.orderNo;

//     const paymentStatus =
//       sbiResponse.statusDescription ||
//       sbiResponse.status;

//     // const atrnNumber =
//     //   sbiResponse.sbiTxnRefNo;
//     const atrnNumber =

//   sbiResponse?.sbiTxnRefNo

//   ||

//   sbiResponse?.atrn

//   ||

//   sbiResponse?.bankTxnNo;

//     // const sbiTransactionId =
//     //   sbiResponse.sbiOrderNumber;
//   //   const sbiTransactionId =

//   // sbiResponse?.sbiOrderNumber

//   // ||

//   // sbiResponse?.orderId

//   // ||

//   // sbiResponse?.sbiOrderId;
//   const sbiTransactionId =

//   sbiResponse?.sbiOrderNumber

//   ||

//   sbiResponse?.orderId

//   ||

//   sbiResponse?.sbiOrderId

//   ||

//   sbiResponse?.sbiOrderRefNumber;
const callbackData = decryptedResponse[0];

const paymentRef =
  callbackData?.orderInfo?.orderRefNumber;

const paymentStatus =
  callbackData?.orderInfo?.orderStatus;

const atrnNumber =
  callbackData?.paymentInfo?.atrnNumber;

const sbiTransactionId =
  callbackData?.orderInfo?.sbiOrderRefNumber;

    console.log("PAYMENT REF:");
    console.log(paymentRef);

    console.log("PAYMENT STATUS:");
    console.log(paymentStatus);

    console.log("ATRN NUMBER:");
    console.log(atrnNumber);

    console.log("ORDER ID:");
    console.log(sbiTransactionId);

    /*
    |--------------------------------------------------------------------------
    | PAYMENT SUCCESS
    |--------------------------------------------------------------------------
    */

    if (

      paymentStatus === "SUCCESS" ||

      paymentStatus === "Success" ||

      paymentStatus === "success" ||

      paymentStatus === "PAID"

    ) {

      await updatePaymentStatus(

        paymentRef,

        {

          payment_status:
            "PAID",

          atrn_no:
            atrnNumber,

          order_id:
            sbiTransactionId,

          // sbi_response_data:
          //   sbiResponse

        }

      );

      console.log(
        "PAYMENT UPDATED SUCCESSFULLY"
      );

      return res.redirect(

        // `https://13.126.222.211/fill-application?paymentRef=${paymentRef}`
       // 'https://tgecetwp.in/response'
	`http://13.126.222.211/response?status=success&paymentRef=${paymentRef}`
      );

    }

    /*
    |--------------------------------------------------------------------------
    | PAYMENT FAILED
    |--------------------------------------------------------------------------
    */

    await updatePaymentStatus(

      paymentRef,

      {

        payment_status:
          "FAILED",

        // sbi_response_data:
        //   sbiResponse

      }

    );

    console.log(
      "PAYMENT FAILED UPDATED"
    );

    return res.redirect(

      "http://13.126.222.211/fee-payment?payment=failed"
      

    );

  }

  catch (error) {

    console.log("SBI CALLBACK ERROR");

    console.log(error);

    return res
      .status(500)
      .send(error.message);

  }

};
module.exports = {

  initiatePayment,
  paymentCallback

};
