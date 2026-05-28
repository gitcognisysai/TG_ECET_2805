
const {
  SBIEPayClient
} = require("epay_nodejs_sdk/dist");

console.log("=================================");
console.log("INITIALIZING SBI SDK");
console.log("=================================");

console.log("SDK config", {

  apiKey:
    process.env.MERCHANT_API_KEY_ID,

  apiSecret:
    process.env.MERCHANT_API_KEY_SECRET,

  encryptionKey:
    process.env.ENCRYPTION_KEY

});

const sbiClient =
  new SBIEPayClient(

    {
      apiKey:
        process.env.MERCHANT_API_KEY_ID,

      apiSecret:
        process.env.MERCHANT_API_KEY_SECRET,

      encryptionKey:
        process.env.ENCRYPTION_KEY
    },

    "SANDBOX",

    true
  );

console.log("=================================");
console.log("SBI CLIENT CREATED");
console.log(sbiClient);
console.log("=================================");

module.exports = sbiClient;
