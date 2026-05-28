const generateRegistrationNumber = () => {
  return (
    "TGECET2026" +
    Math.floor(100000 + Math.random() * 900000)
  );
};

module.exports = generateRegistrationNumber;