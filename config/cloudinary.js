import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// FIXME: review cloudinary account
var storageProfilePictures = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile-pictures',
    allowed_formats: ['jpg', 'png'],
    public_id: (req, _) => req.file,
  }
});

var storagePhenomPictures = new CloudinaryStorage({
  cloudinary,
  paramds: {
    folder: 'phenomena-pictures',
    allowed_formats: ['jpg', 'png'],
    public_id: (req, _) => req.file,
  }
});

var storageReviewPictures = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'review-pictures',
    allowed_formats: ['jpg', 'png'],
    public_id: (req, _) => req.file,
  }
});

const uploadProfilePicture = multer({ storage: storageProfilePictures });
const uploadPhenomPicture = multer({ storage: storagePhenomPictures });
const uploadReviewPicture = multer({ storage: storageReviewPictures })

export {
  uploadProfilePicture,
  uploadPhenomPicture,
  uploadReviewPicture
}