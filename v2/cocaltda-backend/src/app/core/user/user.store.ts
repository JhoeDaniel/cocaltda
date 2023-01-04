import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { User } from './user.class';

export const dml_user_create = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.dml_user_create_modified(${user.id_user_})`;

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

export const view_user_query_read = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.view_user_inner_join cvuij${
			user.name_user != '*'
				? ` where (lower(cvuij.name_user) LIKE '%${user.name_user}%' or lower(cvuij.dni_person) LIKE '%${user.name_user}%'  or lower(cvuij.name_person) LIKE '%${user.name_user}%')`
				: ``
		} order by cvuij.id_user desc`;

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

export const view_user_by_company_query_read = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.view_user_inner_join cvuij${
			user.name_user != '*'
				? ` where (lower(cvuij.name_user) LIKE '%${user.name_user}%' or lower(cvuij.dni_person) LIKE '%${user.name_user}%'  or lower(cvuij.name_person) LIKE '%${user.name_user}%') and cvuij.id_company = ${user.company}`
				: ` where cvuij.id_company = ${user.company}`
		} order by cvuij.id_user desc`;

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

export const view_user_by_type_user_query_read = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.view_user_inner_join cvuij${
			user.name_user != '*'
				? ` where (lower(cvuij.name_user) LIKE '%${user.name_user}%' or lower(cvuij.dni_person) LIKE '%${user.name_user}%'  or lower(cvuij.name_person) LIKE '%${user.name_user}%') and cvuij.id_type_user = ${user.type_user}`
				: ` where cvuij.id_type_user = ${user.type_user}`
		} order by cvuij.id_user desc`;

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

export const view_user_specific_read = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.view_user_inner_join cvuij where cvuij.id_user = ${user.id_user}`;

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

export const dml_user_update = (user: User) => {
	return new Promise<User[]>(async (resolve, reject) => {
		const query = `select * from core.dml_user_update_modified(${user.id_user_},
			${user.id_user},
			${user.company.id_company},
			${user.person.id_person},
			${user.type_user.id_type_user},
			'${user.name_user}',
			'${user.password_user}',
			'${user.avatar_user}',
			${user.status_user},
			${user.deleted_user},
			${user.person.academic.id_academic},
			${user.person.job.id_job},
			'${user.person.dni_person}',
			'${user.person.name_person}',
			'${user.person.last_name_person}',
			'${user.person.address_person}',
			'${user.person.phone_person}',
			'${user.person.academic.title_academic}',
			'${user.person.academic.abbreviation_academic}',
			'${user.person.academic.level_academic}',
			'${user.person.job.name_job}',
			'${user.person.job.address_job}',
			'${user.person.job.phone_job}',
			'${user.person.job.position_job}')`;

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

export const dml_user_delete = (user: User) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_user_delete_modified(${user.id_user_},${user.id_user}) as result`;

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

export const dml_user_upload_avatar = (user: User, new_avatar: string) => {
	return new Promise<any>(async (resolve, reject) => {
		const query = `select * from core.dml_user_upload_avatar(${user.id_user}, '${new_avatar}') as result`;

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
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_user_remove_avatar = (user: User) => {
	return new Promise<any>(async (resolve, reject) => {
		const query = `select * from core.dml_user_remove_avatar(${user.id_user}) as result`;

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
			} else {
				reject(error.toString());
			}
		}
	});
};
