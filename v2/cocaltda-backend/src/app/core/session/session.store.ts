import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Session } from './session.class';

const QUERY_LIMIT: number = 50;

export const view_session_query_read = (session: Session) => {
	return new Promise<Session[]>(async (resolve, reject) => {
		const query = `select * from core.view_session_inner_join cvsij${
			session.host_session != '*'
				? ` where lower(cvsij.host_session) LIKE '%${session.host_session}%'`
				: ``
		} order by cvsij.id_session desc limit ${QUERY_LIMIT}`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const view_session_by_user_query_read = (session: Session) => {
	return new Promise<Session[]>(async (resolve, reject) => {
		const query = `select * from core.view_session_inner_join cvsij${
			session.host_session != '*'
				? ` where lower(cvsij.host_session) LIKE '%${session.host_session}%' and cvsij.id_user = ${session.user}`
				: ` where cvsij.id_user = ${session.user}`
		} order by cvsij.id_session desc limit ${QUERY_LIMIT}`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const view_session_specific_read = (session: Session) => {
	return new Promise<Session[]>(async (resolve, reject) => {
		const query = `select * from core.view_session_inner_join cvsij where cvsij.id_session = ${session.id_session} limit ${QUERY_LIMIT}`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_session_by_session_release = (session: Session) => {
	return new Promise<Session[]>(async (resolve, reject) => {
		const query = `select * from core.dml_session_by_session_release(${session.id_user_},${session.id_session})`;

		// console.log(query);

		try {
			const response = await clientCOCALTDAPostgreSQL.query(query);
			resolve(response.rows);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._messages[3],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_session_by_user_release_all = (session: Session) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_session_by_user_release_all(${session.id_user_},${session.user.id_user}) as result`;

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
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_session_by_company_release_all = (session: Session) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_session_by_company_release_all(${session.id_user_},${session.user.company.id_company}) as result`;

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
			} else {
				reject(error.toString());
			}
		}
	});
};
