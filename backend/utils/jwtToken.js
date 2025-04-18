const {
  preSaveUser,
  getJwtToken,
  comparePassword,
} = require("../helper/createuser");
// create token and saving that in cookies
const sendToken = async (user, statusCode, res) => {
  const token = await getJwtToken(user.id);
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
