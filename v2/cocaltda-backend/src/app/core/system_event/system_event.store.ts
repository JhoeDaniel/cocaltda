import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { SystemEvent } from './system_event.class';

const QUERY_LIMIT: number = 50;

export const view_system_event_query_read = (system_event: SystemEvent) => {
	return new Promise<SystemEvent[]>(async (resolve, reject) => {
		const query = `select * from core.view_system_event_inner_join cvseij${
			system_event.table_system_event != '*'
				? ` where lower(cvseij.table_system_event) LIKE '%${system_event.table_system_event}%'`
				: ``
		} order by cvseij.id_system_event desc limit ${QUERY_LIMIT}`;

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

export const view_system_event_by_user_query_read = (
	system_event: SystemEvent
) => {
	return new Promise<SystemEvent[]>(async (resolve, reject) => {
		const query = `select * from core.view_system_event_inner_join cvseij${
			system_event.table_system_event != '*'
				? ` where lower(cvseij.table_system_event) LIKE '%${system_event.table_system_event}%' and cvseij.id_user = ${system_event.user}`
				: ` where cvseij.id_user = ${system_event.user}`
		} order by cvseij.id_system_event desc limit ${QUERY_LIMIT}`;

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

export const view_system_event_specific_read = (system_event: SystemEvent) => {
	return new Promise<SystemEvent[]>(async (resolve, reject) => {
		const query = `select * from core.view_system_event_inner_join cvseij where cvseij.id_system_event = ${system_event.id_system_event} limit ${QUERY_LIMIT}`;

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
