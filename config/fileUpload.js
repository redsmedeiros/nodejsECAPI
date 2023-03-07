import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config()

const cloudinary = cloudinaryPackage.v2

//configure cloudnary
cloudinary.config({
    cloud_name: 'dwm80wmoe',
    api_key: '398672935798387',
    api_secret: 'O84mxCRzwHPbQVSx8tV6jQ7R0Sc'
})

//create storage
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: {
        folder: 'samples'
    }
})

//init multer with storage engine
const upload = multer({
    storage: storage
})

export default upload;