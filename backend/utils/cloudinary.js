const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Delete a list of images from Cloudinary
 * @param {string[]} publicIds - Array of public IDs to delete
 */
const deleteImages = async (publicIds) => {
  const results = [];

  for (const id of publicIds) {
    try {
      const result = await cloudinary.uploader.destroy(id);
      results.push({
        public_id: id,
        status: result.result === "ok" ? "deleted" : "not found",
        message: result.result,
      });
    } catch (error) {
      results.push({
        public_id: id,
        status: "error",
        message: error.message,
      });
    }
  }

  return results;
};

/**
 * Format multer-uploaded files for DB storage
 * @param {Array} files - Array of multer file objects
 */
const formatUploadedImages = (files) => {
  return files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));
};

module.exports = {
  formatUploadedImages,
  cloudinary,
  deleteImages,
};
