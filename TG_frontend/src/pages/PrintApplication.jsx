// import { useState } from "react";
// import SiteLayout from "@/components/layout/SiteLayout";
// import PageBanner from "@/components/layout/PageBanner";
// import { supabase } from "@/lib/supabaseClient";

// export default function PrintApplication() {
//   // const [form, setForm] = useState({
//   //   registrationNumber: "",
//   //   paymentRef: "",
//   //   hallTicket: "",
//   //   mobile: "",
//   //   dob: "",
//   // });
//   const [form, setForm] = useState({
//   registrationNumber: "",
//   mobile: "",
//   dob: "",
// });

//   const [application, setApplication] = useState(null);
//   const [payment, setPayment] = useState(null);

//   const formatDOB = (value) => {
//     const numbers = value.replace(/\D/g, "").slice(0, 8);

//     if (numbers.length <= 2) return numbers;
//     if (numbers.length <= 4)
//       return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;

//     return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
//   };

//   const isValidDOB = (dob) => {
//     const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
//     const match = dob.match(regex);

//     if (!match) return false;

//     const day = Number(match[1]);
//     const month = Number(match[2]);
//     const year = Number(match[3]);
//     const currentYear = new Date().getFullYear();

//     if (year < 1950 || year > currentYear) return false;

//     const date = new Date(year, month - 1, day);

//     return (
//       date.getFullYear() === year &&
//       date.getMonth() === month - 1 &&
//       date.getDate() === day
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       setForm((prev) => ({
//         ...prev,
//         dob: formatDOB(value),
//       }));
//       return;
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApplication(null);
//     setPayment(null);

//     // if (
//     //   !form.registrationNumber ||
//     //   !form.paymentRef ||
//     //   !form.hallTicket ||
//     //   !form.mobile ||
//     //   !form.dob
//     // ) 
//     if (
//   !form.registrationNumber ||
//   !form.mobile ||
//   !form.dob
// ){
//       alert("Please fill all required fields");
//       return;
//     }

//     if (!isValidDOB(form.dob)) {
//       alert("Please enter Date of Birth in dd/mm/yyyy format");
//       return;
//     }

//     // const { data: appData, error: appError } = await supabase
//     //   .from("applications")
//     //   .select("*")
//     //   .eq("registration_number", form.registrationNumber)
//     //   .eq("payment_reference_id", form.paymentRef)
//     //   .eq("hall_ticket_no", form.hallTicket)
//     //   .eq("mobile_number", form.mobile)
//     //   .eq("date_of_birth", form.dob)
//     //   .maybeSingle();
//     const { data: appData, error: appError } = await supabase
//   .from("applications")
//   .select("*")
//   .eq("registration_number", form.registrationNumber)
//   .eq("mobile_number", form.mobile)
//   .eq("date_of_birth", form.dob)
//   .maybeSingle();

//     if (appError || !appData) {
//       alert("Application details not found");
//       return;
//     }

//     // const { data: paymentData } = await supabase
//     //   .from("fee_payments")
//     //   .select("*")
//     //   .eq("payment_reference_id", form.paymentRef)
//     //   .maybeSingle();
//     const { data: paymentData } = await supabase
//   .from("fee_payments")
//   .select("*")
//   .eq("mobile_number", form.mobile)
//   .eq("date_of_birth", form.dob)
//   .maybeSingle();

//     setApplication(appData);
//     setPayment(paymentData);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <SiteLayout>
//       <div className="print:hidden">
//         <PageBanner
//           title="Print Application"
//           crumbs={[{ label: "Print Application" }]}
//         />

//         <div className="container mx-auto max-w-7xl py-12 px-4">
//           <PageBox title="PRINT TG ECET (WP) - 2026 APPLICATION FORM">
//             <form onSubmit={handleSubmit}>
//               <div className="grid md:grid-cols-3 gap-8">
//                 <Input
//                   label="Registration Number *"
//                   name="registrationNumber"
//                   value={form.registrationNumber}
//                   onChange={handleChange}
//                   placeholder="Enter Registration Number"
//                 />

//                 {/* <Input
//                   label="Payment Reference ID *"
//                   name="paymentRef"
//                   value={form.paymentRef}
//                   onChange={handleChange}
//                   placeholder="Enter Payment Reference ID"
//                 /> */}

//                 {/* <Input
//                   label="Diploma Hall Ticket No. *"
//                   name="hallTicket"
//                   value={form.hallTicket}
//                   onChange={handleChange}
//                   placeholder="Enter Hall Ticket Number"
//                 /> */}

//                 <Input
//                   label="Mobile Number *"
//                   name="mobile"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   placeholder="Enter Mobile Number"
//                 />

//                 <Input
//                   label="Date of Birth * (dd/mm/yyyy)"
//                   name="dob"
//                   value={form.dob}
//                   onChange={handleChange}
//                   placeholder="dd/mm/yyyy"
//                 />
//               </div>

//               <div className="text-center mt-8">
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"
//                 >
//                   Get Application Details
//                 </button>
//               </div>
//             </form>
//           </PageBox>
//         </div>
//       </div>

//       {application && (
//         <>
//           <div className="print:hidden text-center mb-8">
//             <button
//               onClick={handlePrint}
//               className="bg-[#06254D] text-white px-8 py-3 rounded-md hover:opacity-90"
//             >
//               Print / Download PDF
//             </button>
//           </div>

//           <div className="print-area max-w-5xl mx-auto bg-white border-2 border-black p-5 text-[12px] mb-12">
//             {/* <div className="text-center border-b-2 border-black pb-2 mb-2">
//               <h1
//                 style={{
//                   fontFamily: "Arial, Helvetica, sans-serif",
//                   fontSize: "30px",
//                   fontWeight: "700",
//                   letterSpacing: "0px",
//                   lineHeight: "1.2",
//                   color: "#06254D",
//                 }}
//               >
//                 TG ECET(WP) - 2026 APPLICATION FORM
//               </h1>
//             </div> */}
//             <div className="text-center border-b-2 border-black pb-3 mb-3">
//   <div className="flex items-center justify-between px-4">

//     {/* Left Logo */}
//     <img
//       src="/left-logo.png"
//       alt="Left Logo"
//       className="w-14 h-14 object-contain"
//     />

//     {/* Center Title */}
//     <div className="flex-1 text-center">
//       <h1
//         style={{
//           fontFamily: "Arial, Helvetica, sans-serif",
//           fontSize: "30px",
//           fontWeight: "700",
//           letterSpacing: "0px",
//           lineHeight: "1.2",
//           color: "#06254D",
//         }}
//       >
//         TG ECET(WP) - 2026 APPLICATION FORM
//       </h1>
//     </div>

//     {/* Right Logo */}
//     <img
//       src="/right-logo.png"
//       alt="Right Logo"
//       className="w-14 h-14 object-contain"
//     />

//   </div>
// </div>

//             <div className="flex justify-between border-b border-black py-1 mb-3">
//               <p>
//                 <b>Registration No:</b> {application.registration_number}
//               </p>
//               <p>
//                 <b>Payment Ref ID:</b> {application.payment_reference_id}
//               </p>
//             </div>

//             <div className="grid grid-cols-[1fr_155px] gap-4">
//               <div>
//                 <SectionTitle title="1. Personal Information" />
//                 <Table>
//                   <Row label="Candidate Name" value={application.candidate_name} />
//                   <Row label="Father Name" value={application.father_name} />
//                   <Row label="Mother Name" value={application.mother_name} />
//                   <Row label="Date of Birth" value={application.date_of_birth} />
//                   <Row label="Gender" value={application.gender} />
//                   <Row label="Hall Ticket Number" value={application.hall_ticket_no} />
//                   <Row label="Mobile Number" value={application.mobile_number} />
//                   <Row label="Alternate Mobile" value={application.alternate_mobile} />
//                   <Row label="Email ID" value={application.email} />
//                 </Table>
//               </div>

//               <div className="border border-black p-2 text-center">
//                 <p className="font-bold mb-2">Candidate Photo</p>

//                 {application.photo_url ? (
//                   <img
//                     src={application.photo_url}
//                     alt="Candidate"
//                     className="w-32 h-36 object-cover mx-auto border border-black mb-6"
//                   />
//                 ) : (
//                   <div className="w-32 h-36 border border-black mx-auto flex items-center justify-center">
//                     No Photo
//                   </div>
//                 )}

//                 <p className="font-bold mt-4 mb-2">Signature</p>

//                 {application.signature_url ? (
//                   <img
//                     src={application.signature_url}
//                     alt="Signature"
//                     className="w-32 h-12 object-contain mx-auto border border-black"
//                   />
//                 ) : (
//                   <div className="w-32 h-12 border border-black mx-auto flex items-center justify-center">
//                     No Sign
//                   </div>
//                 )}
//               </div>
//             </div>

//             <SectionTitle title="2. Reservation Information" />
//             <div className="grid grid-cols-2 gap-3">
//               <Table>
//                 <Row label="Category" value={application.category} />
//                 <Row label="PH Status" value={application.ph_status} />
//               </Table>

//               <Table>
//                 <Row label="Local Area Status" value={application.local_area} />
//                 <Row label="Payment Status" value={payment?.payment_status || "PAID"} />
//               </Table>
//             </div>

//             <SectionTitle title="3. Academic Details" />
//             <Table>
//               <Row label="Diploma Branch" value={application.branch_diploma} />
//               <Row label="Entrance Test Branch" value={application.branch_entrance} />
//               <Row label="Passing Year" value={application.passing_year} />
//               <Row label="Marks Percentage" value={application.marks_percentage} />
//             </Table>

//             <SectionTitle title="4. Employment Details" />
//             <Table>
//               <Row
//                 label="Employer Name & Address"
//                 value={application.employer_name_address}
//               />
//               <Row
//                 label="Designation"
//                 value={application.employment_designation}
//               />
//             </Table>

//             <div className="border border-black border-t-0 p-3 text-[11px]">
//               <ol className="list-decimal ml-4 space-y-1">
//                 <li>
//                   Permission letter from employer to pursue the programme must
//                   be produced during counselling.
//                 </li>
//                 <li>
//                   Minimum one year experience certificate should be produced
//                   during counselling.
//                 </li>
//                 <li>
//                   Original employer permission letter should be submitted at the
//                   time of counselling.
//                 </li>
//               </ol>
//             </div>

//             <SectionTitle title="5. Payment Information" />
//             <Table>
//               <Row
//                 label="Payment Reference ID"
//                 value={application.payment_reference_id}
//               />
//               <Row label="Payment Mode" value={payment?.payment_mode} />
//               <Row label="Payment Status" value={payment?.payment_status || "PAID"} />
//               <Row
//                 label="Submitted Date"
//                 value={
//                   application.created_at
//                     ? new Date(application.created_at).toLocaleString()
//                     : "-"
//                 }
//               />
//             </Table>

//             <div className="grid grid-cols-2 gap-3 mt-2">
//               <div>
//                 <SectionTitle title="6. Address for Communication" />
//                 <Table>
//                   <Row label="Address" value={application.address} />
//                   <Row label="District" value={application.district} />
//                   <Row label="State" value={application.state} />
//                   <Row label="Pincode" value={application.pincode} />
//                 </Table>
//               </div>

//               <div>
//                 <SectionTitle title="7. Permanent Address" />
//                 <Table>
//                   <Row label="Address" value={application.permanent_address} />
//                   <Row
//                     label="District"
//                     value={application.permanent_district}
//                   />
//                   <Row label="State" value={application.permanent_state} />
//                   <Row
//                     label="Pincode"
//                     value={application.permanent_pincode}
//                   />
//                 </Table>
//               </div>
//             </div>

//             <div className="border border-black p-3 mt-2">
//               <p className="font-bold mb-1">Declaration:</p>
//               <p>
//                 I declare that the details furnished above are true and correct
//                 to the best of my knowledge. I am responsible for the correctness
//                 of the information submitted.
//               </p>
//             </div>
//           </div>
//         </>
//       )}
//     </SiteLayout>
//   );
// }

// function PageBox({ title, children }) {
//   return (
//     <div className="border border-gray-300 bg-[#f8fbf8] shadow-sm min-h-[330px]">
//       <h2 className="bg-[#4b3f8f] text-white font-bold text-xl px-4 py-2">
//         {title}
//       </h2>

//       <div className="p-6">{children}</div>
//     </div>
//   );
// }

// function Input({ label, name, value, onChange, placeholder }) {
//   return (
//     <div>
//       <label className="font-semibold block mb-2">{label}</label>

//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border border-gray-300 rounded-md px-4 py-3"
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }

// function SectionTitle({ title }) {
//   return (
//     <h3 className="bg-gray-200 text-[#06254D] font-semibold text-[15px] leading-none px-3 py-2 border border-black mt-4 font-sans">
//       {title}
//     </h3>
//   );
// }

// function Table({ children }) {
//   return <div className="border-l border-r border-black">{children}</div>;
// }

// function Row({ label, value }) {
//   return (
//     <div className="grid grid-cols-[180px_1fr] border-b border-black min-h-[28px]">
//       <div className="border-r border-black px-2 py-1 font-semibold">
//         {label}
//       </div>

//       <div className="px-2 py-1">{value || "-"}</div>
//     </div>
//   );
// }















import { useState } from "react";

import SiteLayout
from "@/components/layout/SiteLayout";

import PageBanner
from "@/components/layout/PageBanner";

export default function PrintApplication() {

  const [form, setForm] =
    useState({

      registrationNumber: "",

      mobile: "",

      dob: ""

    });

  const [application, setApplication] =
    useState(null);

  const [payment, setPayment] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | FORMAT DOB
  |--------------------------------------------------------------------------
  */

  const formatDOB = (value) => {

    const numbers =
      value
        .replace(/\D/g, "")
        .slice(0, 8);

    if (numbers.length <= 2)
      return numbers;

    if (numbers.length <= 4)

      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;

  };

  /*
  |--------------------------------------------------------------------------
  | VALIDATE DOB
  |--------------------------------------------------------------------------
  */

  const isValidDOB = (dob) => {

    const regex =
      /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const match =
      dob.match(regex);

    if (!match)
      return false;

    const day =
      Number(match[1]);

    const month =
      Number(match[2]);

    const year =
      Number(match[3]);

    const currentYear =
      new Date().getFullYear();

    if (
      year < 1950 ||
      year > currentYear
    ) {

      return false;

    }

    const date =
      new Date(
        year,
        month - 1,
        day
      );

    return (

      date.getFullYear() === year &&

      date.getMonth() === month - 1 &&

      date.getDate() === day

    );

  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    /*
    |--------------------------------------------------------------------------
    | DOB FORMAT
    |--------------------------------------------------------------------------
    */

    if (name === "dob") {

      setForm((prev) => ({

        ...prev,

        dob:
          formatDOB(value)

      }));

      return;

    }

    /*
    |--------------------------------------------------------------------------
    | MOBILE ONLY NUMBERS
    |--------------------------------------------------------------------------
    */

    if (name === "mobile") {

      const onlyNumbers =
        value.replace(/\D/g, "");

      setForm((prev) => ({

        ...prev,

        mobile:
          onlyNumbers

      }));

      return;

    }

    setForm((prev) => ({

      ...prev,

      [name]:
        value

    }));

  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    setApplication(null);

    setPayment(null);

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (

      !form.registrationNumber ||

      !form.mobile ||

      !form.dob

    ) {

      alert(
        "Please fill all required fields"
      );

      return;

    }

    /*
    |--------------------------------------------------------------------------
    | MOBILE VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      form.mobile.length !== 10
    ) {

      alert(
        "Please enter valid mobile number"
      );

      return;

    }

    /*
    |--------------------------------------------------------------------------
    | DOB VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !isValidDOB(form.dob)
    ) {

      alert(
        "Please enter Date of Birth in dd/mm/yyyy format"
      );

      return;

    }

    try {

      /*
      |--------------------------------------------------------------------------
      | BACKEND API CALL
      |--------------------------------------------------------------------------
      */

      const response =
        await fetch(

          "https://tgecetwp.in/api/payments/print",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              registrationNumber:
                form.registrationNumber,

              mobile:
                form.mobile,

              dob:
                form.dob

            })

          }

        );

      const result =
        await response.json();

      console.log(
        "PRINT RESPONSE =>",
        result
      );

      /*
      |--------------------------------------------------------------------------
      | FAILED
      |--------------------------------------------------------------------------
      */

      if (!result.success) {

        alert(
          result.message
        );

        return;

      }

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      setApplication(
        result.application
      );

      setPayment(
        result.payment
      );

    }

    catch (error) {

      console.log(
        "PRINT ERROR =>",
        error
      );

      alert(
        "Server error. Please try again."
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE PRINT
  |--------------------------------------------------------------------------
  */

  const handlePrint = () => {

    window.print();

  };

  return (

    <SiteLayout>

      {/* SCREEN ONLY */}

      <div className="print:hidden">

        <PageBanner

          title="Print Application"

          crumbs={[
            {
              label:
                "Print Application"
            }
          ]}

        />

        <div className="container mx-auto max-w-7xl py-12 px-4">

          <PageBox
            title="PRINT TG ECET (WP) - 2026 APPLICATION FORM"
          >

            <form onSubmit={handleSubmit}>

              <div className="grid md:grid-cols-3 gap-8">

                <Input

                  label="Registration Number *"

                  name="registrationNumber"

                  value={
                    form.registrationNumber
                  }

                  onChange={handleChange}

                  placeholder="Enter Registration Number"

                />

                <Input

                  label="Mobile Number *"

                  name="mobile"

                  value={form.mobile}

                  onChange={handleChange}

                  placeholder="Enter Mobile Number"

                />

                <Input

                  label="Date of Birth * (dd/mm/yyyy)"

                  name="dob"

                  value={form.dob}

                  onChange={handleChange}

                  placeholder="dd/mm/yyyy"

                />

              </div>

              <div className="text-center mt-8">

                <button

                  type="submit"

                  className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"

                >

                  Get Application Details

                </button>

              </div>

            </form>

          </PageBox>

        </div>

      </div>

      {/* PRINT AREA */}

      {application && (

        <>

          <div className="print:hidden text-center mb-8">

            <button

              onClick={handlePrint}

              className="bg-[#06254D] text-white px-8 py-3 rounded-md hover:opacity-90"

            >

              Print / Download PDF

            </button>

          </div>

          <div className="print-area max-w-5xl mx-auto bg-white border-2 border-black p-5 text-[12px] mb-12">

            {/* HEADER */}

            <div className="text-center border-b-2 border-black pb-3 mb-3">

              <div className="flex items-center justify-between px-4">

                {/* LEFT LOGO */}

                <img

                  src="/left-logo.png"

                  alt="Left Logo"

                  className="w-14 h-14 object-contain"

                />

                {/* TITLE */}

                <div className="flex-1 text-center">

                  <h1

                    style={{

                      fontFamily:
                        "Arial, Helvetica, sans-serif",

                      fontSize:
                        "30px",

                      fontWeight:
                        "700",

                      color:
                        "#06254D"

                    }}

                  >

                    TG ECET(WP) - 2026 APPLICATION FORM

                  </h1>

                </div>

                {/* RIGHT LOGO */}

                <img

                  src="/right-logo.png"

                  alt="Right Logo"

                  className="w-14 h-14 object-contain"

                />

              </div>

            </div>

            {/* REGISTRATION */}

            <div className="flex justify-between border-b border-black py-1 mb-3">

              <p>

                <b>Registration No:</b>{" "}

                {
                  application.registration_number
                }

              </p>

              <p>

                <b>Payment Ref ID:</b>{" "}

                {
                  application.payment_reference_id
                }

              </p>

            </div>

            {/* PERSONAL INFO */}

            <SectionTitle
              title="1. Personal Information"
            />

            <Table>

              <Row
                label="Candidate Name"
                value={
                  application.candidate_name
                }
              />

              <Row
                label="Father Name"
                value={
                  application.father_name
                }
              />

              <Row
                label="Mother Name"
                value={
                  application.mother_name
                }
              />

              <Row
                label="Date of Birth"
                value={
                  application.date_of_birth
                }
              />

              <Row
                label="Gender"
                value={
                  application.gender
                }
              />

              <Row
                label="Hall Ticket Number"
                value={
                  application.hall_ticket_no
                }
              />

              <Row
                label="Mobile Number"
                value={
                  application.mobile_number
                }
              />

              <Row
                label="Email"
                value={
                  application.email
                }
              />

            </Table>

            {/* RESERVATION */}

            <SectionTitle
              title="2. Reservation Information"
            />

            <Table>

              <Row
                label="Category"
                value={
                  application.category
                }
              />

              <Row
                label="PH Status"
                value={
                  application.ph_status
                }
              />

            </Table>

            {/* ACADEMIC */}

            <SectionTitle
              title="3. Academic Details"
            />

            <Table>

              <Row
                label="Diploma Branch"
                value={
                  application.branch_diploma
                }
              />

              <Row
                label="Entrance Branch"
                value={
                  application.branch_entrance
                }
              />

              <Row
                label="Passing Year"
                value={
                  application.passing_year
                }
              />

            </Table>

            {/* PAYMENT */}

            <SectionTitle
              title="4. Payment Details"
            />

            <Table>

              <Row
                label="Payment Status"
                value={
                  payment?.payment_status ||
                  "PAID"
                }
              />

              <Row
                label="Payment Mode"
                value={
                  payment?.payment_mode
                }
              />

              <Row
                label="Payment Ref ID"
                value={
                  application.payment_reference_id
                }
              />

            </Table>

          </div>

        </>

      )}

    </SiteLayout>

  );

}

/*
|--------------------------------------------------------------------------
| PAGE BOX
|--------------------------------------------------------------------------
*/

function PageBox({
  title,
  children
}) {

  return (

    <div className="border border-gray-300 bg-[#f8fbf8] shadow-sm min-h-[330px]">

      <h2 className="bg-[#4b3f8f] text-white font-bold text-xl px-4 py-2">

        {title}

      </h2>

      <div className="p-6">

        {children}

      </div>

    </div>

  );

}

/*
|--------------------------------------------------------------------------
| INPUT
|--------------------------------------------------------------------------
*/

function Input({

  label,

  name,

  value,

  onChange,

  placeholder

}) {

  return (

    <div>

      <label className="font-semibold block mb-2">

        {label}

      </label>

      <input

        type="text"

        name={name}

        value={value}

        onChange={onChange}

        maxLength={
          name === "dob"
            ? 10
            : name === "mobile"
            ? 10
            : undefined
        }

        className="w-full border border-gray-300 rounded-md px-4 py-3"

        placeholder={placeholder}

      />

    </div>

  );

}

/*
|--------------------------------------------------------------------------
| SECTION TITLE
|--------------------------------------------------------------------------
*/

function SectionTitle({
  title
}) {

  return (

    <h3 className="bg-gray-200 text-[#06254D] font-semibold text-[15px] px-3 py-2 border border-black mt-4">

      {title}

    </h3>

  );

}

/*
|--------------------------------------------------------------------------
| TABLE
|--------------------------------------------------------------------------
*/

function Table({
  children
}) {

  return (

    <div className="border-l border-r border-black">

      {children}

    </div>

  );

}

/*
|--------------------------------------------------------------------------
| ROW
|--------------------------------------------------------------------------
*/

function Row({
  label,
  value
}) {

  return (

    <div className="grid grid-cols-[180px_1fr] border-b border-black min-h-[28px]">

      <div className="border-r border-black px-2 py-1 font-semibold">

        {label}

      </div>

      <div className="px-2 py-1">

        {value || "-"}

      </div>

    </div>

  );

}
