import { generateToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Payload } from './auth.types';

export class Auth {
	/** Attributes */
	public name_user: string;
	public password_user: string;
	public access_token: string;
	public expiration_token: number;
	/** Constructor */
	constructor(
		name_user: string = '',
		password_user: string = '',
		access_token: string = '',
		expiration_token: number = 180
	) {
		this.name_user = name_user;
		this.password_user = password_user;
		this.access_token = access_token;
		this.expiration_token = expiration_token;
	}
	/** Setters and Getters */
	set _name_user(name_user: string) {
		this.name_user = name_user;
	}
	get _name_user() {
		return this.name_user;
	}

	set _password_user(password_user: string) {
		this.password_user = password_user;
	}
	get _password_user() {
		return this.password_user;
	}

	set _access_token(access_token: string) {
		this.access_token = access_token;
	}
	get _access_token() {
		return this.access_token;
	}

	set _expiration_token(expiration_token: number) {
		this.expiration_token = expiration_token;
	}
	get _expiration_token() {
		return this.expiration_token!;
	}
	/**
	 * signIn
	 * @param session
	 * @returns
	 */
	signIn(auth: Auth) {
		return new Promise<string>(async (resolve, reject) => {
			/**
			 * Verify the name_user and password
			 */
			if (
				auth.name_user === 'contact@cocaltda.fin.ec' &&
				auth.password_user === 'FFXMZkUlkINQXezXF9rooA=='
			) {
				const _payload: Payload = {
					name_user: auth.name_user,
				};

				await generateToken(_payload, this.expiration_token)
					.then((token: string) => {
						resolve(token);
					})
					.catch((err: any) => {
						reject(err);
					});
			} else {
				reject({
					..._messages[4],
				});
			}
		});
	}
}
