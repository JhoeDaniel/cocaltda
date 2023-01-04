import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { TypeUser } from './type_user.class';

export const dml_type_user_create = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.dml_type_user_create_modified(${type_user.id_user_})`;

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

export const view_type_user_query_read = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.view_type_user_inner_join cvtuij${
			type_user.name_type_user != '*'
				? ` where lower(cvtuij.name_type_user) LIKE '%${type_user.name_type_user}%'`
				: ``
		} order by cvtuij.id_type_user desc`;

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

export const view_type_user_by_company_query_read = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.view_type_user_inner_join cvtuij${
			type_user.name_type_user != '*'
				? ` where lower(cvtuij.name_type_user) LIKE '%${type_user.name_type_user}%' and cvtuij.id_company = ${type_user.company}`
				: ` where cvtuij.id_company = ${type_user.company}`
		} order by cvtuij.id_type_user desc`;

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

export const view_type_user_by_profile_query_read = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.view_type_user_inner_join cvtuij${
			type_user.name_type_user != '*'
				? ` where lower(cvtuij.name_type_user) LIKE '%${type_user.name_type_user}%' and cvtuij.id_profile = ${type_user.profile}`
				: ` where cvtuij.id_profile = ${type_user.profile}`
		} order by cvtuij.id_type_user desc`;

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

export const view_type_user_specific_read = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.view_type_user_inner_join cvtuij where cvtuij.id_type_user = ${type_user.id_type_user}`;

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

export const dml_type_user_update = (type_user: TypeUser) => {
	return new Promise<TypeUser[]>(async (resolve, reject) => {
		const query = `select * from core.dml_type_user_update_modified(${type_user.id_user_},
			${type_user.id_type_user},
			${type_user.company.id_company},
			${type_user.profile.id_profile},
			'${type_user.name_type_user}',
			'${type_user.description_type_user}',
			${type_user.status_type_user},
			${type_user.deleted_type_user})`;

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

export const dml_type_user_delete = (type_user: TypeUser) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_type_user_delete(${type_user.id_user_},${type_user.id_type_user}) as result`;

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
