import { generateRandomNumber } from '../../../utils/global';
import { generateToken, verifyToken } from '../../../utils/jwt';
import { generateMail, sendMail } from '../../../utils/mail/mail';
import { forgotPasswordMail } from '../../../utils/mail/mail.declarate';
import {
	auth_check_user,
	auth_reset_password,
	auth_sign_in,
	auth_sign_out,
} from './auth.store';
import {
	AppInitialData,
	Company,
	Payload,
	Person,
	Profile,
	Session,
	Setting,
	TypeUser,
	User,
} from './auth.types';

export class Auth {
	/** Attributes */
	public name_user: string;
	public password_user: string;
	public access_token: string;
	public expiration_token?: string;
	/** Constructor */
	constructor(
		name_user: string = '',
		password_user: string = '',
		access_token: string = '',
		expiration_token: string = '180'
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

	set _expiration_token(expiration_token: string) {
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
	signIn(session: Session) {
		return new Promise<AppInitialData>(async (resolve, reject) => {
			await auth_sign_in(this, session)
				.then(async (response) => {
					if (response.status_sign_in == true) {
						const _setting: Setting = {
							id_setting: response.id_setting,
							expiration_token: response.expiration_token,
							inactivity_time: response.inactivity_time,
						};

						const _company: Company = {
							id_company: response.id_company,
							name_company: response.name_company,
							status_company: response.status_company,
							setting: _setting,
						};

						const _person: Person = {
							id_person: response.id_person,
							dni_person: response.dni_person,
							name_person: response.name_person,
							last_name_person: response.last_name_person,
							address_person: response.address_person,
							phone_person: response.phone_person,
						};

						const _profile: Profile = {
							id_profile: response.id_profile,
							type_profile: response.type_profile,
							name_profile: response.name_profile,
							description_profile: response.description_profile,
							status_profile: response.status_profile,
						};

						const _typeUser: TypeUser = {
							id_type_user: response.id_profile,
							profile: _profile,
							name_type_user: response.type_profile,
							description_type_user: response.name_profile,
							status_type_user: response.description_profile,
						};

						const _user: User = {
							id_user: response.id_user,
							company: _company,
							person: _person,
							type_user: _typeUser,
							name_user: response.name_user,
							avatar_user: response.avatar_user,
							status_user: response.status_user,
						};

						const payload: Payload = {
							id_session: response.id_session,
							name_user: _user.name_user!,
							name_person: _user.person.name_person!,
							last_name_person: _user.person.last_name_person!,
							company: _company,
						};

						await generateToken(payload, parseInt(response.expiration_token))
							.then((token: string) => {
								resolve({
									access_token: token,
									user: _user,
									navigation: response.navigation,
								});
							})
							.catch((err: any) => {
								reject(err);
							});
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	/**
	 * signInUsingToken
	 * @returns
	 */
	signInUsingToken() {
		return new Promise<AppInitialData>(async (resolve, reject) => {
			await verifyToken(this.access_token)
				.then(async (decoded: any) => {
					const payload: Payload = {
						id_session: decoded.id_session,
						name_user: decoded.name_user,
						name_person: decoded.name_person,
						last_name_person: decoded.last_name_person,
						company: decoded.company,
					};

					await generateToken(payload, parseInt(this.expiration_token!))
						.then((token: string) => {
							resolve({
								access_token: token,
							});
						})
						.catch((err: any) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	/**
	 * unlockSession
	 * @param session
	 * @returns
	 */
	unlockSession(session: Session) {
		return new Promise<AppInitialData>(async (resolve, reject) => {
			await auth_sign_in(this, session)
				.then(async (response) => {
					if (response.status_sign_in == true) {
						const _setting: Setting = {
							id_setting: response.id_setting,
							expiration_token: response.expiration_token,
							inactivity_time: response.inactivity_time,
						};

						const _company: Company = {
							id_company: response.id_company,
							name_company: response.name_company,
							status_company: response.status_company,
							setting: _setting,
						};

						const _person: Person = {
							id_person: response.id_person,
							dni_person: response.dni_person,
							name_person: response.name_person,
							last_name_person: response.last_name_person,
							address_person: response.address_person,
							phone_person: response.phone_person,
						};

						const _profile: Profile = {
							id_profile: response.id_profile,
							type_profile: response.type_profile,
							name_profile: response.name_profile,
							description_profile: response.description_profile,
							status_profile: response.status_profile,
						};

						const _typeUser: TypeUser = {
							id_type_user: response.id_profile,
							profile: _profile,
							name_type_user: response.type_profile,
							description_type_user: response.name_profile,
							status_type_user: response.description_profile,
						};

						const _user: User = {
							id_user: response.id_user,
							company: _company,
							person: _person,
							type_user: _typeUser,
							name_user: response.name_user,
							avatar_user: response.avatar_user,
							status_user: response.status_user,
						};

						const payload: Payload = {
							id_session: response.id_session,
							name_user: _user.name_user!,
							name_person: _user.person.name_person!,
							last_name_person: _user.person.last_name_person!,
							company: _company,
						};

						await generateToken(payload, parseInt(response.expiration_token))
							.then((token: string) => {
								resolve({
									access_token: token,
									user: _user,
									navigation: response.navigation,
								});
							})
							.catch((err: any) => {
								reject(err);
							});
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	/**
	 * signOut
	 * @param name_user
	 * @param id_session
	 * @returns
	 */
	signOut(name_user: string, id_session: string) {
		return new Promise<boolean>(async (resolve, reject) => {
			await auth_sign_out(name_user, id_session)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	/**
	 * forgotPassword
	 * @returns
	 */
	forgotPassword() {
		return new Promise<String>(async (resolve, reject) => {
			await auth_check_user(this)
				.then(async (response) => {
					if (response.status_check_user) {
						const code: string = generateRandomNumber(6);
						const expiration = parseInt(response._expiration_verification_code);
						// Enviar mensaje con el codigo de verificacion
						const mailGenerado = generateMail(
							`"COCALTDA" <${process.env.MAILER_USER}>`,
							this.name_user,
							'¿Olvidaste tu contraseña?',
							forgotPasswordMail(code, expiration)
						);

						await sendMail(mailGenerado)
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								reject(error);
							});

						const payload: any = {
							code,
						};

						await generateToken(payload, expiration)
							.then((token: string) => {
								resolve(token);
							})
							.catch((err: any) => {
								reject(err);
							});
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	/**
	 * resetPassword
	 * @returns
	 */
	resetPassword() {
		return new Promise<String>(async (resolve, reject) => {
			await auth_reset_password(this)
				.then(async (response) => {
					if (response) {
						resolve(response);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
