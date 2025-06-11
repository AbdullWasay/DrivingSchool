const express = require("express");
const router = express.Router();
const { uploadSchoolFiles } = require("../middleware/upload");
const {
  uploadImage,
  uploadProfilePicture,
  uploadLogo,
  uploadDocument,
  uploadMultipleImages,
} = require("../lib/cloudinary");

// Upload single image (profile picture, logo, etc.)
router.post("/single", uploadSchoolFiles.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const { type = "general" } = req.body;
    let result;

    // Convert buffer to base64 for Cloudinary
    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    switch (type) {
      case "profile":
        result = await uploadProfilePicture({ buffer: fileStr });
        break;
      case "logo":
        result = await uploadLogo({ buffer: fileStr });
        break;
      case "document":
        result = await uploadDocument({ buffer: fileStr });
        break;
      default:
        result = await uploadImage({ buffer: fileStr });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to upload image",
    });
  }
});

// Upload multiple images (school photos)
router.post(
  "/multiple",
  uploadSchoolFiles.array("images", 5),
  async (req, res) => {
    try {
      console.log("Multiple upload request received");
      console.log("Files:", req.files ? req.files.length : 0);

      if (!req.files || req.files.length === 0) {
        console.log("No files in request");
        return res.status(400).json({
          success: false,
          error: "No files uploaded",
        });
      }

      console.log("Processing", req.files.length, "files");

      // Convert buffers to base64 for Cloudinary
      const filePromises = req.files.map((file, index) => {
        console.log(
          `Processing file ${index + 1}:`,
          file.originalname,
          file.mimetype
        );
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
        return uploadImage({ buffer: fileStr }, "fahrschulfinder/schools");
      });

      const results = await Promise.all(filePromises);
      console.log("Upload successful, results:", results.length);

      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.error("Multiple upload error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to upload images",
      });
    }
  }
);

// Upload school registration files (profile, logo, license, photos)
router.post(
  "/school-registration",
  uploadSchoolFiles.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "businessLicense", maxCount: 1 },
    { name: "photos", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const uploadedFiles = {};

      // Upload profile picture
      if (req.files.profilePicture && req.files.profilePicture[0]) {
        const file = req.files.profilePicture[0];
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
        uploadedFiles.profilePicture = await uploadProfilePicture({
          buffer: fileStr,
        });
      }

      // Upload logo
      if (req.files.logo && req.files.logo[0]) {
        const file = req.files.logo[0];
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
        uploadedFiles.logo = await uploadLogo({ buffer: fileStr });
      }

      // Upload business license
      if (req.files.businessLicense && req.files.businessLicense[0]) {
        const file = req.files.businessLicense[0];
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
        uploadedFiles.businessLicense = await uploadDocument({
          buffer: fileStr,
        });
      }

      // Upload school photos
      if (req.files.photos && req.files.photos.length > 0) {
        const photoPromises = req.files.photos.map((file) => {
          const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`;
          return uploadImage({ buffer: fileStr }, "fahrschulfinder/schools");
        });
        uploadedFiles.photos = await Promise.all(photoPromises);
      }

      res.status(200).json({
        success: true,
        data: uploadedFiles,
      });
    } catch (error) {
      console.error("School registration upload error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to upload files",
      });
    }
  }
);

module.exports = router;
