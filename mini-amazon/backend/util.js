//add isAuth, isSeller, isAdmin
import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
    return jwt.sign({
        uid: user.uid,
        email: user.email,
        isAuth: user.isAuth,
        isSeller: user.isSeller,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    });
}

export {
    getToken
}