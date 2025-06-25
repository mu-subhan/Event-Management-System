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
        return res.status(201).json({
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
          role: true,
        },
      });
      if (!user) {
        return next(new ErrorHandler("Email Doesn't Exist!", 400));
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Login Credentials Wrong!", 400));
      }
      delete user.password; // Removes the 'age' key
      sendToken(user, 201, res);
      // return res.status(200).json({ success: true });
    } catch (error) {
      console.log("errro handler catch run!");
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
      const userWithCounts = await prisma.user.findUnique({
        where: { id: req.user.id },
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
          _count: {
            select: {
              events: true, // count of events user manages
              roles: true, // count of roles user has
            },
          },
        },
      });
      if (!userWithCounts) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        user: userWithCounts,
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
      console.log("req.body in api : ", req.body);
      const user = await prisma.User.findUnique({ where: { email } });

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      console.log("password, user.password: ", password, user.password);
      const isPasswordValid = await comparePassword(password, user.password);
      console.log("isPasswordValid: ", isPasswordValid);
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
      console.log("error is: ", error);
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Get paginated users
      const users = await prisma.User.findMany({
        where: {
          role: "Volunteer", // adjust this based on your actual field name and value
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "asc",
        },
      });

      // Get total user count for pagination
      const totalUsers = await prisma.User.count();

      // Count users by role
      const countAdmins = await prisma.User.count({
        where: { role: "Admin" },
      });

      const countVolunteers = await prisma.User.count({
        where: { role: "Volunteer" },
      });

      res.status(200).json({
        success: true,
        users,
        pagination: {
          totalUsers,
          page,
          limit,
          totalPages: Math.ceil(totalUsers / limit),
        },
        roleCounts: {
          Admin: countAdmins,
          Volunteer: countVolunteers,
        },
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

      const imageId = user?.profileImage?.public_id;
      if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
      }

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
// search user volunteer
router.get(
  "/search-volunteer",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, event_id } = req.query;
      console.log("name: ", name, " event_id: ", event_id);
      if (!name || name.trim() === "" || !event_id || event_id.trim() === "") {
        throw new Error(
          name ? "Event ID" : "Name",
          "query parameter is required",
          400
        );
      }

      // Find users with role = 'volunteer' and name contains the search term (case-insensitive)
      let users = await prisma.User.findMany({
        where: {
          role: "Volunteer",
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
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
          roles: {
            select: {
              id: true,
              event_id: true,
              role_name: true,
              skills: true, // example field; adjust based on your schema
              description: true,
              volunteers: true,
            },
          }, // list all fields you want to include, but **do not** include password
        },
      });
      users = users.filter(
        (user) => !user.roles.some((r) => r.event_id === event_id)
      );
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return next(new ErrorHandler("Server error", 500));
    }
  })
);

// update user profile (without password verification)
router.put(
  "/update-profile",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        email,
        contactNumber,
        skills,
        interests,
        experienceYears,
        description,
        name,
      } = req.body;

      // Since user is already authenticated, we can use req.user.id
      const updatedUser = await prisma.User.update({
        where: { id: req.user.id },
        data: {
          name,
          contactNumber,
          skills,
          interests,
          experienceYears,
          description,
        },
      });

      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      console.log("error is: ", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
