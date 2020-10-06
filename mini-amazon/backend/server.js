import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemRoute from './routes/itemRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .catch(err => console.log(err));

const app = express();

app.use("/api/products", itemRoute);

app.listen(8080, () => {console.log('Server started at http://localhost:8080')});


