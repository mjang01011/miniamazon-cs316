//if MONGODB_URL does not exist, use default address
export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/miniamazon',
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
}