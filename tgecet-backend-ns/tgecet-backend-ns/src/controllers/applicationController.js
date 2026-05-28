// const supabase = require("../config/supabase");

// const {
//   saveApplication
// } = require("../services/applicationService");

// const generateRegistrationNumber = require(
//   "../utils/generateRegistrationNumber"
// );

// const createApplication = async (req, res) => {

//   try {

//     const body = req.body;

//     const files = req.files;

//     const photo = files.photo?.[0];
//     const signature = files.signature?.[0];

//     if (!photo || !signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Photo and signature required"
//       });
//     }

//     const existing = await supabase
//       .from("applications")
//       .select("*")
//       .eq("payment_reference_id", body.paymentRef)
//       .maybeSingle();

//     if (existing.data) {
//       return res.status(400).json({
//         success: false,
//         message: "Application already submitted"
//       });
//     }

//     const photoFileName =
//       `photos/${Date.now()}-${photo.originalname}`;

//     const signatureFileName =
//       `signatures/${Date.now()}-${signature.originalname}`;

//     const { error: photoError } = await supabase.storage
//       .from("application-files")
//       .upload(photoFileName, photo.buffer, {
//         contentType: photo.mimetype
//       });

//     if (photoError) {
//       throw new Error(photoError.message);
//     }

//     const { error: signError } = await supabase.storage
//       .from("application-files")
//       .upload(signatureFileName, signature.buffer, {
//         contentType: signature.mimetype
//       });

//     if (signError) {
//       throw new Error(signError.message);
//     }

//     const photoUrl = supabase.storage
//       .from("application-files")
//       .getPublicUrl(photoFileName).data.publicUrl;

//     const signatureUrl = supabase.storage
//       .from("application-files")
//       .getPublicUrl(signatureFileName).data.publicUrl;

//     const registrationNumber =
//       generateRegistrationNumber();

//     const applicationData = {
//       registration_number: registrationNumber,

//       payment_reference_id: body.paymentRef,
//       hall_ticket_no: body.hallTicket,
//       mobile_number: body.mobile,
//       date_of_birth: body.dob,

//       candidate_name: body.candidateName,
//       father_name: body.fatherName,
//       mother_name: body.motherName,
//       gender: body.gender,
//       email: body.email,
//       alternate_mobile: body.alternateMobile,

//       category: body.category,
//       ph_status: body.phStatus,
//       branch_diploma: body.branchDiploma,
//       branch_entrance: body.branchEntrance,
//       passing_year: body.passingYear,
//       marks_percentage: body.marksPercentage,

//       employer_name_address: body.employerNameAddress,
//       employment_designation: body.employmentDesignation,

//       address: body.communicationAddress,
//       district: body.commDistrict,
//       state: body.commState,
//       pincode: body.commPincode,

//       permanent_address: body.permanentAddress,
//       permanent_district: body.permDistrict,
//       permanent_state: body.permState,
//       permanent_pincode: body.permPincode,

//       photo_url: photoUrl,
//       signature_url: signatureUrl
//     };

//     await saveApplication(applicationData);

//     res.status(201).json({
//       success: true,
//       registrationNumber
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };

// module.exports = {
//   createApplication
// };












const supabase = require("../config/supabase");

const {
  saveApplication
} = require("../services/applicationService");

const generateRegistrationNumber = require(
  "../utils/generateRegistrationNumber"
);

const createApplication = async (req, res) => {

  console.log("=================================");
  console.log("APPLICATION SUBMIT API HIT");
  console.log("REQUEST BODY:");
  console.log(req.body);
  console.log("=================================");

  try {

    const body = req.body;

    const files = req.files;

    console.log("FILES RECEIVED:");
    console.log(files);

    const photo = files.photo?.[0];

    const signature = files.signature?.[0];

    console.log("PHOTO:");
    console.log(photo);

    console.log("SIGNATURE:");
    console.log(signature);

    if (!photo || !signature) {

      console.log("PHOTO OR SIGNATURE MISSING");

      return res.status(400).json({
        success: false,
        message: "Photo and signature required"
      });
    }

    console.log("CHECKING EXISTING APPLICATION");

    const existing = await supabase
      .from("applications")
      .select("*")
      .eq("payment_reference_id", body.paymentRef)
      .maybeSingle();

    console.log("EXISTING APPLICATION RESULT:");
    console.log(existing.data);

    if (existing.data) {

      console.log("APPLICATION ALREADY EXISTS");

      return res.status(400).json({
        success: false,
        message: "Application already submitted"
      });
    }

    const photoFileName =
      `photos/${Date.now()}-${photo.originalname}`;

    const signatureFileName =
      `signatures/${Date.now()}-${signature.originalname}`;

    console.log("PHOTO FILE NAME:");
    console.log(photoFileName);

    console.log("SIGNATURE FILE NAME:");
    console.log(signatureFileName);

    console.log("UPLOADING PHOTO");

    const { error: photoError } = await supabase.storage
      .from("application-files")
      .upload(photoFileName, photo.buffer, {
        contentType: photo.mimetype
      });

    if (photoError) {

      console.log("PHOTO UPLOAD ERROR");
      console.log(photoError);

      throw new Error(photoError.message);
    }

    console.log("PHOTO UPLOADED SUCCESSFULLY");

    console.log("UPLOADING SIGNATURE");

    const { error: signError } = await supabase.storage
      .from("application-files")
      .upload(signatureFileName, signature.buffer, {
        contentType: signature.mimetype
      });

    if (signError) {

      console.log("SIGNATURE UPLOAD ERROR");
      console.log(signError);

      throw new Error(signError.message);
    }

    console.log("SIGNATURE UPLOADED SUCCESSFULLY");

    const photoUrl = supabase.storage
      .from("application-files")
      .getPublicUrl(photoFileName).data.publicUrl;

    const signatureUrl = supabase.storage
      .from("application-files")
      .getPublicUrl(signatureFileName).data.publicUrl;

    console.log("PHOTO URL:");
    console.log(photoUrl);

    console.log("SIGNATURE URL:");
    console.log(signatureUrl);

    const registrationNumber =
      generateRegistrationNumber();

    console.log("GENERATED REGISTRATION NUMBER:");
    console.log(registrationNumber);

    const applicationData = {
      registration_number: registrationNumber,

      payment_reference_id: body.paymentRef,
      hall_ticket_no: body.hallTicket,
      mobile_number: body.mobile,
      date_of_birth: body.dob,

      candidate_name: body.candidateName,
      father_name: body.fatherName,
      mother_name: body.motherName,
      gender: body.gender,
      email: body.email,
      alternate_mobile: body.alternateMobile,

      category: body.category,
      ph_status: body.phStatus,
      branch_diploma: body.branchDiploma,
      branch_entrance: body.branchEntrance,
      passing_year: body.passingYear,
      marks_percentage: body.marksPercentage,

      employer_name_address: body.employerNameAddress,
      employment_designation: body.employmentDesignation,

      address: body.communicationAddress,
      district: body.commDistrict,
      state: body.commState,
      pincode: body.commPincode,

      permanent_address: body.permanentAddress,
      permanent_district: body.permDistrict,
      permanent_state: body.permState,
      permanent_pincode: body.permPincode,

      photo_url: photoUrl,
      signature_url: signatureUrl
    };

    console.log("FINAL APPLICATION DATA:");
    console.log(applicationData);

    console.log("SAVING APPLICATION");

    await saveApplication(applicationData);

    console.log("APPLICATION SAVED SUCCESSFULLY");

    res.status(201).json({
      success: true,
      registrationNumber
    });

  } catch (error) {

    console.log("APPLICATION SUBMIT ERROR");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createApplication
};