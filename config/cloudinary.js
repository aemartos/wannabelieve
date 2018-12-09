const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storageProfilePictures = cloudinaryStorage({
  cloudinary,
  folder: 'profile-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

var storagePhenomPictures = cloudinaryStorage({
  cloudinary,
  folder: 'phenomena-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

var storageReviewPictures = cloudinaryStorage({
  cloudinary,
  folder: 'review-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

const uploadProfilePicture = multer({ storage: storageProfilePictures });
const uploadPhenomPicture = multer({storage: storagePhenomPictures});
const uploadReviewPicture = multer({storage: storageReviewPictures})


module.exports = {
  uploadProfilePicture,
  uploadPhenomPicture,
  uploadReviewPicture
}