//to upload images to AWS S3 bucket

import AWS from 'aws-sdk';
import config from '../config';
import multer from 'multer';
import express from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

const AWS_BUCKET_NAME = 'miniamazon';
const AWS_FILE_LINK = 'https://miniamazon.s3.us-east-2.amazonaws.com/'

router.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file;

    const s3bucket = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION,
    });

    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: new Date().getTime().toString() + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: true, Message: err });
        } else {
            const fileLink = AWS_FILE_LINK + params.Key
            res.send({ fileLink: fileLink });

        }
    });
})

export default router;







