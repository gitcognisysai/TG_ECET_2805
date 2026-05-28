const generatePaymentRef = () => {
  return "TGECET" + Date.now();
};

module.exports = generatePaymentRef;