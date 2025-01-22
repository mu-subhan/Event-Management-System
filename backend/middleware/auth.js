const prisma = require("../db/db.server");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzM3NTQ0NjEzfQ.wWiOhIMy6xcZ6ao54Yr4RVYrEpFrgI22onaBuNlITKk";
  console.log("token is: ", token);
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("decoded is: ", decoded);
  req.user = await prisma.User.findUnique({ where: { id: decoded.id } });
  // User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources!`)
      );
    }
    next();
  };
};
