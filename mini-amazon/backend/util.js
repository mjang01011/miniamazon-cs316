//add isAuth, isSeller, isAdmin for authentication tokens

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

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
};

const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        return next();
    }
    return res.status(401).send({ message: 'User is not a seller.' });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: 'User does not have admin privileges.' });
};

export { getToken, isAuth, isSeller, isAdmin };