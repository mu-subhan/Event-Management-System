const prisma = require("../db/db.server");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Dummy Authentication Just For Testign
  console.log("req.cookies: ", req.cookies);
  const { token } = req.cookies;

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzM3NjI5OTQzfQ.z8EkONv9GIbTBGxWzwZ64XC5fPF1XpRbWI0jJ99RfKk";
  console.log("token is: ", token);
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await prisma.User.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      contactNumber: true,
      role: true,
      skills: true,
      interests: true,
      experienceYears: true,
      profileImage: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  console.log("req.body.adminId: ", req.body.adminId);
  if (req.user.role === "Admin") req.body.adminId = req?.user?.id;
  console.log("req.user: ", req.user);
  // req.user.role = "Admin";
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
