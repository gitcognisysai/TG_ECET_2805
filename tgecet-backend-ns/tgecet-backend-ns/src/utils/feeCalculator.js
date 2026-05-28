const calculateFee =
(payload) => {

  /*
  |-----------------------------------------
  | BASE FEE
  |-----------------------------------------
  */

  let baseFee = 3000;

  /*
  |-----------------------------------------
  | BC CATEGORY
  |-----------------------------------------
  */

  if (
    [
      "BC_A",
      "BC_B",
      "BC_C",
      "BC_D",
      "BC_E"
    ].includes(payload.category)
  ) {

    baseFee = 2500;

  }

  /*
  |-----------------------------------------
  | SC / ST CATEGORY
  |-----------------------------------------
  */

  if (
    [
      "SC_I",
      "SC_II",
      "SC_III",
      "ST"
    ].includes(payload.category)
  ) {

    baseFee = 2000;

  }

  /*
  |-----------------------------------------
  | PH CONCESSION
  |-----------------------------------------
  */

  let phDiscount = 0;

  if (
    payload.phStatus === "YES"
  ) {

    phDiscount = 500;

  }

  /*
  |-----------------------------------------
  | LATE FEE
  |-----------------------------------------
  */

  let lateFee = 0;

  const today =
    new Date();

  /*
  | 12 JULY 2026 → 21 JULY 2026
  */

  const lateFeeStart =
    new Date("2026-07-12");

  const lateFeeEnd =
    new Date("2026-07-21");

  if (
    today >= lateFeeStart &&
    today <= lateFeeEnd
  ) {

    lateFee = 1500;

  }

  /*
  |-----------------------------------------
  | TOTAL AMOUNT
  |-----------------------------------------
  */

  const totalAmount =
    baseFee +
    lateFee -
    phDiscount;

  return {

    baseFee,

    lateFee,

    phDiscount,

    totalAmount

  };

};

module.exports =
  calculateFee;
