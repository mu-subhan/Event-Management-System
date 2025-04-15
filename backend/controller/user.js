const express = require("express");
// const User = require("../model/user");
const router = express.Router();
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const prisma = require("../db/db.server");
const userValidator = require("../validation/Validator/user");
const { upload } = require("../config/multer");
// user helper function
const {
  comparePassword,
  getJwtToken,
  preSaveUser,
} = require("../helper/createuser");

// create user
router.post(
  "/create-user",
  upload.single("avatar"),
  userValidator.createUserValidation,
  async (req, res, next) => {
    try {
      console.log("APi End POint Hit!");
      console.log("req.file is: ", req.file);
      const {
        name,
        email,
        password,
        contactNumber,
        skills,
        interests,
        experienceYears,
        description,
      } = req.body;
      // console.log("Prisma is: ", prisma);
      const userEmail = await prisma.User.findUnique({
        where: {
          email: email, // Replace `email` with the actual email variable
        },
      });

      if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = {
        name: name,
        email: email,
        password: password,
        avatar: {
          public_id: req.file.filename,
          url: req.file.path,
        },
        contactNumber,
        skills,
        interests,
        experienceYears,
        description,
      };
      const activationToken = createActivationToken(user);
      const activationUrl = `${process.env.frontendUrl}/activation/${activationToken}`;
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${user.email} to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      console.log("erro is: ", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        name,
        email,
        password,
        avatar,
        contactNumber,
        skills,
        interests,
        experienceYears,
        description,
      } = newUser;

      let user = await prisma.User.findUnique({
        where: {
          email: email, // Replace `email` with the actual email variable
        },
      });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await prisma.User.create({
        data: {
          name,
          email,
          password: await preSaveUser(password),
          profileImage: avatar,
          contactNumber,
          skills,
          interests,
          experienceYears: Number(experienceYears),
          description,
        },
      });

      sendToken(user, 201, res);
    } catch (error) {
      console.log("error is: ", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await prisma.User.findUnique({
        where: { email: email },
        select: {
          id: true,
          password: true,
          email: true,
        },
      });
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      delete user.password; // Removes the 'age' key
      sendToken(user, 201, res);
      // return res.status(200).json({ success: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const user =
      //  await User.findById(req.user.id);

      if (!req.user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        email,
        password,
        contactNumber,
        skills,
        interests,
        experienceYears,
        description,
        name,
      } = req.body;

      const user = await prisma.User.findUnique({ where: { email } });

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      const updatedUser = await prisma.User.update({
        where: { email: email },
        data: {
          name,
          email,
          password,
          contactNumber,
          skills,
          interests,
          experienceYears,
          description,
        },
      });

      res.status(201).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let updatedProfilePic = {};
      if (req.file) {
        const imageId = req.user.profileImage.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        updatedProfilePic = {
          public_id: req.file.filename,
          url: req.file.path,
        };
      }

      const updatedUser = await prisma.User.update({
        where: { email: req.user.email },
        data: {
          profileImage: updatedProfilePic,
        },
      });

      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.user) throw new Error("Authentication Failed!");
      const isPasswordMatched = await comparePassword(
        req.body.oldPassword,
        req.user.password
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }

      const hashpassword = await preSaveUser(req.body.newPassword);
      console.log("hashpassword : ", hashpassword);
      const updatedUser = await prisma.User.update({
        where: { email: req.user.email },
        data: {
          password: hashpassword,
        },
      });
      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await prisma.User.findUnique({
        where: { id: Number(req.params.id) },
      });
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log("erro is: ", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await await prisma.User.findMany({
        orderBy: {
          createdAt: "asc", // Ascending order
        },
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await prisma.User.findUnique({
        where: { id: Number(req.params.id) },
      });
      // const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      // await User.findByIdAndDelete(req.params.id);
      await prisma.User.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
