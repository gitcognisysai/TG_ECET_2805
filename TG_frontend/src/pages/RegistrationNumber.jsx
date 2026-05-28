// import { useState } from "react";
// import SiteLayout from "@/components/layout/SiteLayout";
// import PageBanner from "@/components/layout/PageBanner";
// import { supabase } from "@/lib/supabaseClient";

// export default function RegistrationNumber() {
//   const [form, setForm] = useState({
//     paymentRef: "",
//     hallTicket: "",
//     mobile: "",
//     dob: "",
//   });

//   const [result, setResult] = useState(null);

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

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setResult(null);

//   //   if (!form.paymentRef || !form.hallTicket || !form.mobile || !form.dob) {
//   //     alert("Please fill all required fields");
//   //     return;
//   //   }

//   //   if (!isValidDOB(form.dob)) {
//   //     alert("Please enter Date of Birth in dd/mm/yyyy format");
//   //     return;
//   //   }

//   //   const { data, error } = await supabase
//   //     .from("applications")
//   //     .select("*")
//   //     .eq("payment_reference_id", form.paymentRef)
//   //     .eq("hall_ticket_no", form.hallTicket)
//   //     .eq("mobile_number", form.mobile)
//   //     .eq("date_of_birth", form.dob)
//   //     .maybeSingle();

//   //   if (error || !data) {
//   //     alert("No registration found with given details");
//   //     return;
//   //   }

//   //   setResult(data);
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   setResult(null);

//   // VALIDATION
//   if (!form.mobile || !form.dob) {
//     alert("Please fill all required fields");
//     return;
//   }

//   // DOB VALIDATION
//   if (!isValidDOB(form.dob)) {
//     alert("Please enter Date of Birth in dd/mm/yyyy format");
//     return;
//   }

//   // FETCH REGISTRATION
//   const { data, error } = await supabase
//     .from("applications")
//     .select("*")
//     .eq("mobile_number", form.mobile)
//     .eq("date_of_birth", form.dob)
//     .maybeSingle();

//   if (error || !data) {
//     alert("No registration found with given details");
//     return;
//   }

//   setResult(data);
// };

//   return (
//     <SiteLayout>
//       <PageBanner
//         title="Registration Number"
//         crumbs={[{ label: "Registration Number" }]}
//       />

//       <div className="container mx-auto max-w-7xl py-12 px-4">
//         <PageBox title="KNOW YOUR REGISTRATION NUMBER FOR TG ECET (WP) - 2026">
//           <form onSubmit={handleSubmit}>
//             <div className="grid md:grid-cols-4 gap-6">
//               {/* <Input
//                 label="Payment Reference ID *"
//                 name="paymentRef"
//                 value={form.paymentRef}
//                 onChange={handleChange}
//                 placeholder="Enter Payment Reference ID"
//               /> */}

//               {/* <Input
//                 label="Diploma Hall Ticket No *"
//                 name="hallTicket"
//                 value={form.hallTicket}
//                 onChange={handleChange}
//                 placeholder="Enter Diploma Hall Ticket No"
//               /> */}

//               <Input
//                 label="Mobile Number *"
//                 name="mobile"
//                 value={form.mobile}
//                 onChange={handleChange}
//                 placeholder="Enter Mobile Number"
//               />

//               <Input
//                 label="Date of Birth * (dd/mm/yyyy)"
//                 name="dob"
//                 value={form.dob}
//                 onChange={handleChange}
//                 placeholder="dd/mm/yyyy"
//               />
//             </div>

//             <div className="text-center mt-8">
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>

//           {result && (
//             <div className="mt-8 border border-green-400 bg-white p-6 rounded-md max-w-4xl">
//               <h3 className="text-xl font-bold text-green-700 mb-4">
//                 Registration Found Successfully
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4 text-sm">
//                 <Detail
//                   label="Registration Number"
//                   value={result.registration_number}
//                 />
//                 <Detail
//                   label="Payment Reference ID"
//                   value={result.payment_reference_id}
//                 />
//                 <Detail
//                   label="Hall Ticket Number"
//                   value={result.hall_ticket_no}
//                 />
//                 <Detail label="Mobile Number" value={result.mobile_number} />
//                 <Detail label="Date of Birth" value={result.date_of_birth} />
//               </div>
//             </div>
//           )}
//         </PageBox>
//       </div>
//     </SiteLayout>
//   );
// }

// /* ---------- UI Components ---------- */

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
//         type="text"
//         name={name}
//         value={value}
//         onChange={onChange}
//         maxLength={name === "dob" ? 10 : undefined}
//         className="w-full border border-gray-300 rounded-md px-4 py-3"
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div className="border p-3 rounded-md">
//       <p className="font-semibold text-[#06254D]">{label}</p>
//       <p>{value}</p>
//     </div>
//   );
// }









import { useState } from "react";

import SiteLayout
from "@/components/layout/SiteLayout";

import PageBanner
from "@/components/layout/PageBanner";

export default function RegistrationNumber() {

  const [form, setForm] =
    useState({

      mobile: "",

      dob: ""

    });

  const [result, setResult] =
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
    | MOBILE NUMBER
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

    setResult(null);

    /*
    |--------------------------------------------------------------------------
    | REQUIRED VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
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

          "https://tgecetwp.in/api/payments/registration-number",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

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
        "REGISTRATION RESPONSE =>",
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

      setResult(
        result.result
      );

    }

    catch (error) {

      console.log(
        "REGISTRATION ERROR =>",
        error
      );

      alert(
        "Server error. Please try again."
      );

    }

  };

  return (

    <SiteLayout>

      <PageBanner

        title="Registration Number"

        crumbs={[
          {
            label:
              "Registration Number"
          }
        ]}

      />

      <div className="container mx-auto max-w-7xl py-12 px-4">

        <PageBox
          title="KNOW YOUR REGISTRATION NUMBER FOR TG ECET (WP) - 2026"
        >

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-4 gap-6">

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

                Submit

              </button>

            </div>

          </form>

          {/* RESULT */}

          {result && (

            <div className="mt-8 border border-green-400 bg-white p-6 rounded-md max-w-4xl">

              <h3 className="text-xl font-bold text-green-700 mb-4">

                Registration Found Successfully

              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">

                <Detail

                  label="Registration Number"

                  value={
                    result.registration_number
                  }

                />

                <Detail

                  label="Payment Reference ID"

                  value={
                    result.payment_reference_id
                  }

                />

                <Detail

                  label="Hall Ticket Number"

                  value={
                    result.hall_ticket_no
                  }

                />

                <Detail

                  label="Mobile Number"

                  value={
                    result.mobile_number
                  }

                />

                <Detail

                  label="Date of Birth"

                  value={
                    result.date_of_birth
                  }

                />

              </div>

            </div>

          )}

        </PageBox>

      </div>

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
| DETAIL
|--------------------------------------------------------------------------
*/

function Detail({
  label,
  value
}) {

  return (

    <div className="border p-3 rounded-md">

      <p className="font-semibold text-[#06254D]">

        {label}

      </p>

      <p>{value}</p>

    </div>

  );

}

