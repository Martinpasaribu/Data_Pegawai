import  express  from "express";
import { createdata, getdata } from "../controllers/User.js";

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: 'dxkker0mf',
    api_key: '319942613824945',
    api_secret: 'kiNHdZNe8x8vxuwhaitjq-cEXkM'
  });
  
  
  const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
          folder: 'img_Labora',
          format: async (req, file) => 'png',
          transformation: [{ width: 500, height: 500, crop: 'limit' }]
      }
  });

const upload = multer({ storage: storage });

// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/data',  upload.array('foto', 2), createdata);


router.get('/data', getdata);




export default router; 