const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "FYP",
    format: async (req, file) => {
      const mimeToExtension = {
        "image/png": "png",
        "image/jpeg": "jpg", // only one needed for both .jpg and .jpeg
        "image/webp": "webp",
        "image/gif": "gif",
      };

      return mimeToExtension[file.mimetype] || "jpg"; // Default to 'jpg' if format is unsupported
    },
    public_id: (req, file) => `computed-filename-${Date.now()}`,
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  // limits: { fileSize: 500000 }, // 500 KB file size limit
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg", // only one needed for both .jpg and .jpeg
      "image/webp",
      "image/gif",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
        false
      );
    }
  },
});
module.exports = { upload };
