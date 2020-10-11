//to upload images to AWS S3 bucket

import AWS from 'aws-sdk';
import config from '../config';
import multer from 'multer';
import multerS3 from 'multer-s3';
import express from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

const AWS_BUCKET_NAME = 'miniamazon';
const AWS_FILE_LINK = 'https://s3-us-east-2.amazonaws.com/miniamazon'

router.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file;

    const s3bucket = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION,
    });

    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name + new Date(),
        Body: file.buffer,
        ContentType: multerS3.AUTO_CONTENT_TYPE,
        ACL: 'public-read'
    };

    s3bucket.upload(params, function(err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            const fileLink = AWS_FILE_LINK + params.Key
            res.send({ fileLink: fileLink });

        }
    });
})

export default router;







