import  Express  from "express";
import createHttpError from "http-errors"

import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const ExperienceFileRouter=Express.Router()

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, 
      params: {
        folder: "fs0522/experience",
      },
    }),
  }).single("image")



  export default ExperienceFileRouter