//if MONGODB_URL does not exist, use default address
export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/miniamazon'
}