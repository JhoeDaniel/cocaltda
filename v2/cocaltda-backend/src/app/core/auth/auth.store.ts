import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Auth } from './auth.class';
import { Session } from './auth.types';

export const auth_sign_in = (auth: Auth, session: Session) => {
	return new Promise<any>(async (resolve, reject) => {
		const query = `select * from core.auth_sign_in('${auth.name_user}', '${
			auth.password_user
		}', '${session.host}', '${JSON.stringify(session.agent)}') as result`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows[0]);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else if (error.detail == '_database_auth') {
				reject({
					..._messages[4],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const auth_check_user = (auth: Auth) => {
	return new Promise<any>(async (resolve, reject) => {
		const query = `select * from core.auth_check_user('${auth.name_user}') as result`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows[0]);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else if (error.detail == '_database_auth') {
				reject({
					..._messages[4],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const auth_sign_out = (name_user: string, id_session: string) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.auth_sign_out('${name_user}',${id_session}) as result`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows[0].result);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else if (error.detail == '_database_auth') {
				reject({
					..._messages[4],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const auth_reset_password = (auth: Auth) => {
	return new Promise<any>(async (resolve, reject) => {
		const query = `select * from core.auth_reset_password('${auth.name_user}', '${auth.password_user}') as result`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows[0].result);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else if (error.detail == '_database_auth') {
				reject({
					..._messages[4],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const auth_check_session = (id_session: string, session: Session) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.auth_check_session(${id_session}, '${JSON.stringify(
			session
		)}') as result`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows[0].result);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else if (error.detail == '_database_auth') {
				reject({
					..._messages[4],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};
