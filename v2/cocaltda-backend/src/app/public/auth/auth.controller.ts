import { _messages } from '../../../utils/message/message';
import { Auth } from './auth.class';

export const validation = (dataLogin: Auth, url: string) => {
	return new Promise<any>(async (resolve, reject) => {
		/**
		 * Capa de validaciones
		 */

		if (url == '/sign-in') {
			/** User Validation */
			if (dataLogin.name_user) {
				if (typeof dataLogin.name_user == 'string') {
					if (dataLogin.name_user.toString().length > 320) {
						reject({
							..._messages[8],
							description: _messages[8].description
								.replace('_nameAttribute', 'name_user')
								.replace('_expectedCharacters', '320'),
						});
					}
				} else {
					reject({
						..._messages[7],
						description: _messages[7].description
							.replace('_nameAttribute', 'name_user')
							.replace('_expectedType', 'string'),
					});
				}
			} else {
				reject({
					..._messages[6],
					description: _messages[6].description.replace(
						'_nameAttribute',
						'name_user'
					),
				});
			}
			/**
			 * Password Validation
			 */
			if (dataLogin.password_user) {
				if (typeof dataLogin.password_user == 'string') {
					if (dataLogin.password_user.toString().length > 250) {
						reject({
							..._messages[8],
							description: _messages[8].description
								.replace('_nameAttribute', 'password_user')
								.replace('_expectedCharacters', '250'),
						});
					}
				} else {
					reject({
						..._messages[7],
						description: _messages[7].description
							.replace('_nameAttribute', 'password_user')
							.replace('_expectedType', 'string'),
					});
				}
			} else {
				reject({
					..._messages[6],
					description: _messages[6].description.replace(
						'_nameAttribute',
						'password_user'
					),
				});
			}
		}

		/**
		 * Instance the class
		 */
		let _auth = new Auth();
		/**
		 * Execute the action depending of url route
		 */
		if (url == '/sign-in') {
			_auth.name_user = dataLogin.name_user;
			_auth.password_user = dataLogin.password_user;
			await _auth
				.signIn(_auth)
				.then((token: string) => {
					resolve(token);
				})
				.catch((err) => {
					reject(err);
				});
		}
	});
};
