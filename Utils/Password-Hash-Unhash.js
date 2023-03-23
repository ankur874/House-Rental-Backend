const bcrypt = require("bcrypt");

exports.hashPassword = async (userPassword) => {
  const hash = await bcrypt.hash(userPassword, 10);
  return hash;
};

exports.comparePassword = async (enteredPassword, hashedPassword) => {
  const result = await bcrypt.compare(enteredPassword, hashedPassword);
  return result;
};
