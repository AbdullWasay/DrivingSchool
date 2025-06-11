const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dkwzwy17v',
  api_key: process.env.CLOUDINARY_API_KEY || '934121348486484',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'aHT_62k-aPOpDPu6nXVaHI2vIEY',
});

// Upload image to Cloudinary
const uploadImage = async (file, folder = 'fahrschulfinder') => {
  try {
    const result = await cloudinary.uploader.upload(file.path || file.buffer, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

// Upload multiple images
const uploadMultipleImages = async (files, folder = 'fahrschulfinder') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error('Failed to upload images');
  }
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

// Upload profile picture with specific transformations
const uploadProfilePicture = async (file, folder = 'fahrschulfinder/profiles') => {
  try {
    const result = await cloudinary.uploader.upload(file.path || file.buffer, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Profile picture upload error:', error);
    throw new Error('Failed to upload profile picture');
  }
};

// Upload logo with specific transformations
const uploadLogo = async (file, folder = 'fahrschulfinder/logos') => {
  try {
    const result = await cloudinary.uploader.upload(file.path || file.buffer, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 300, height: 300, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Logo upload error:', error);
    throw new Error('Failed to upload logo');
  }
};

// Upload business license document
const uploadDocument = async (file, folder = 'fahrschulfinder/documents') => {
  try {
    const result = await cloudinary.uploader.upload(file.path || file.buffer, {
      folder: folder,
      resource_type: 'auto', // Supports PDF and images
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Document upload error:', error);
    throw new Error('Failed to upload document');
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  uploadProfilePicture,
  uploadLogo,
  uploadDocument
};
