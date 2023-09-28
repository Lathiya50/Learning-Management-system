import { v2 as cloudinary } from 'cloudinary';
import { app } from './app';
require('dotenv').config();
import connectDB from "./util/db"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
    connectDB();
});