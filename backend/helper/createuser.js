const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

preSaveUser = async (password) => {
  let hashpassword = await bcrypt.hash(password, 10);
  return hashpassword;
};
// jwt token
getJwtToken = async function (id) {
  try {
    console.log("JWT TOKEN GEnerate Function Run ! ");
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);
    console.log("User Token Genrated : ", token);
    return token;
  } catch (error) {
    console.log("Something Went WRong Durong Token Generation ! ");
    console.log(error);
  }
};

// compare password
comparePassword = async function (enteredPassword) {
  // console.log("COmparison Function run ", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = { comparePassword, getJwtToken, preSaveUser };
