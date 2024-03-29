import { sign } from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import logging from '../config/logging'
import { IUser } from '../interfaces/user.interface';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign token for ${user.email}`);

    try {
        jwt.sign(
            {
                _id: user._id,
                email: user.email,
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                address: user.address,
                phone: user.phone,
                image: user.image,
                title: user.title,
                bio: user.bio,
                experience: user.experience
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        )
    } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;