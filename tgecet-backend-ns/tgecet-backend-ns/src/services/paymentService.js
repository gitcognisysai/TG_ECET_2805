const supabase = require("../config/supabase");

/*
|--------------------------------------------------------------------------
| SAVE PAYMENT
|--------------------------------------------------------------------------
*/

const savePayment = async (paymentData) => {

  console.log("=================================");
  console.log("INSERTING PAYMENT DATA =>");
  console.log(paymentData);
  console.log(
    "PAYMENT DATA KEYS =>",
    Object.keys(paymentData)
  );
  console.log("=================================");

  const { data, error } = await supabase
    .from("fee_payments")
    .insert([paymentData])
    .select();

  if (error) {

    console.error("=================================");
    console.error("SUPABASE ERROR =>");
    console.error(error);
    console.error("=================================");

    throw new Error(error.message);

  }

  console.log("=================================");
  console.log("PAYMENT SAVED SUCCESSFULLY");
  console.log(data);
  console.log("=================================");

  return data;
};

/*
|--------------------------------------------------------------------------
| GET PAYMENT STATUS
|--------------------------------------------------------------------------
*/

const getPaymentStatus = async (hallTicket, mobile) => {

  const { data, error } = await supabase
    .from("fee_payments")
    .select("*")
    .eq("hall_ticket_no", hallTicket)
    .eq("mobile_number", mobile)
    .maybeSingle();

  if (error) {

    console.error("SUPABASE ERROR =>", error);

    throw new Error(error.message);

  }

  return data;
};

/*
|--------------------------------------------------------------------------
| VERIFY PAYMENT
|--------------------------------------------------------------------------
*/

const verifyPayment = async (
  paymentRef,
  hallTicket,
  mobile,
  dob
) => {

  const { data, error } = await supabase
    .from("fee_payments")
    .select("*")
    .eq("payment_reference_id", paymentRef)
    .eq("hall_ticket_no", hallTicket)
    .eq("mobile_number", mobile)
    .eq("date_of_birth", dob)
    .maybeSingle();

  if (error) {

    console.error("SUPABASE ERROR =>", error);

    throw new Error(error.message);

  }

  return data;
};

/*
|--------------------------------------------------------------------------
| CHECK EXISTING APPLICATION
|--------------------------------------------------------------------------
*/

const checkExistingApplication = async (
  paymentRef
) => {

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("payment_reference_id", paymentRef)
    .maybeSingle();

  if (error) {

    console.error("SUPABASE ERROR =>", error);

    throw new Error(error.message);

  }

  return data;
};

/*
|--------------------------------------------------------------------------
| GET APPLICATION DETAILS
|--------------------------------------------------------------------------
*/

const getApplicationDetails = async (
  registrationNumber,
  paymentRef,
  hallTicket,
  mobile,
  dob
) => {

  const { data: application, error: appError } =
    await supabase
      .from("applications")
      .select("*")
      .eq("registration_number", registrationNumber)
      .eq("payment_reference_id", paymentRef)
      .eq("hall_ticket_no", hallTicket)
      .eq("mobile_number", mobile)
      .eq("date_of_birth", dob)
      .maybeSingle();

  if (appError) {

    console.error("SUPABASE ERROR =>", appError);

    throw new Error(appError.message);

  }

  if (!application) {
    return null;
  }

  const { data: payment, error: paymentError } =
    await supabase
      .from("fee_payments")
      .select("*")
      .eq("payment_reference_id", paymentRef)
      .maybeSingle();

  if (paymentError) {

    console.error("SUPABASE ERROR =>", paymentError);

    throw new Error(paymentError.message);

  }

  return {
    application,
    payment
  };
};

/*
|--------------------------------------------------------------------------
| GET REGISTRATION NUMBER
|--------------------------------------------------------------------------
*/

const getRegistrationNumber = async (
  paymentRef,
  hallTicket,
  mobile,
  dob
) => {

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("payment_reference_id", paymentRef)
    .eq("hall_ticket_no", hallTicket)
    .eq("mobile_number", mobile)
    .eq("date_of_birth", dob)
    .maybeSingle();

  if (error) {

    console.error("SUPABASE ERROR =>", error);

    throw new Error(error.message);

  }

  return data;
};
const updatePaymentStatus =
async (
  paymentRef,
  updateData
) => {

  const {
    data,
    error
  } = await supabase
    .from("fee_payments")
    .update(updateData)
    .eq(
      "payment_reference_id",
      paymentRef
    )
    .select();

  if (error) {

    console.error(
      "UPDATE PAYMENT ERROR =>",
      error
    );

    throw new Error(error.message);

  }

  return data;

};
module.exports = {
  savePayment,
  getPaymentStatus,
  verifyPayment,
  checkExistingApplication,
  getApplicationDetails,
  getRegistrationNumber,
  updatePaymentStatus
};
