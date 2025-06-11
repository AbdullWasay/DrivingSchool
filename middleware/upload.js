const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../lib/cloudinary");

// Cloudinary storage for profile pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fahrschulfinder/profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "face" },
      { quality: "auto" },
    ],
  },
});

// Cloudinary storage for logos
const logoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fahrschulfinder/logos",
    allowed_formats: ["jpg", "jpeg", "png", "svg"],
    transformation: [
      { width: 300, height: 300, crop: "limit" },
      { quality: "auto" },
    ],
  },
});

// Cloudinary storage for school photos
const schoolPhotosStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fahrschulfinder/schools",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 800, height: 600, crop: "limit" },
      { quality: "auto" },
    ],
  },
});

// Cloudinary storage for documents
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fahrschulfinder/documents",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    resource_type: "auto",
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.fieldname === "profilePicture" || file.fieldname === "logo") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files are allowed for profile pictures and logos"
        ),
        false
      );
    }
  } else if (file.fieldname === "businessLicense") {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image files and PDFs are allowed for business license"),
        false
      );
    }
  } else if (file.fieldname === "photos" || file.fieldname === "images") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for school photos"), false);
    }
  } else {
    cb(null, true);
  }
};

// Create multer instances
const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: fileFilter,
});

const uploadLogo = multer({
  storage: logoStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: fileFilter,
});

const uploadSchoolPhotos = multer({
  storage: schoolPhotosStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB per file
    files: 5, // Maximum 5 files
  },
  fileFilter: fileFilter,
});

const uploadDocument = multer({
  storage: documentStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Combined upload for school registration
const uploadSchoolFiles = multer({
  storage: multer.memoryStorage(), // Use memory storage for flexibility
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10, // Maximum 10 files total
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadProfilePicture,
  uploadLogo,
  uploadSchoolPhotos,
  uploadDocument,
  uploadSchoolFiles,
};
