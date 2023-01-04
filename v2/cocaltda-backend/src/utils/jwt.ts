import jwt from 'jsonwebtoken';
import { Payload } from '../app/public/auth/auth.types';
import { _messages } from './message/message';
/**
 * generateToken
 * @param _payload
 * @param _expiresIn
 * @returns token
 */
export const generateToken = (_payload: Payload, _expiresIn: number = 180) => {
	return new Promise<string>((resolve, reject) => {
		try {
			const token = jwt.sign(_payload, `${process.env.KEY_JWT}`, {
				expiresIn: _expiresIn,
			});
			resolve(token);
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
/**
 * verifyToken
 * @param _token
 * @returns decoded
 */
export const verifyToken = (_token: string): Promise<Payload> => {
	return new Promise<Payload>((resolve, reject) => {
		try {
			jwt.verify(
				_token,
				`${process.env.KEY_JWT}`,
				async (err, decoded: Payload | any) => {
					if (decoded != undefined && typeof decoded == 'object') {
						resolve(decoded);
					} else {
						reject(_messages[4]);
					}
				}
			);
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
