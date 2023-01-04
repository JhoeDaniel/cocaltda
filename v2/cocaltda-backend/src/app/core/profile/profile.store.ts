import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Profile } from './profile.class';

export const dml_profile_create = (profile: Profile) => {
	return new Promise<Profile[]>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_create_modified(${profile.id_user_},${profile.company.id_company})`;

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

export const view_profile_query_read = (profile: Profile) => {
	return new Promise<Profile[]>(async (resolve, reject) => {
		const query = `select * from core.view_profile_inner_join cvpij${
			profile.name_profile != '*'
				? ` where lower(cvpij.name_profile) LIKE '%${profile.name_profile}%'`
				: ``
		} order by cvpij.id_profile desc`;

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

export const view_profile_by_company_query_read = (profile: Profile) => {
	return new Promise<Profile[]>(async (resolve, reject) => {
		const query = `select * from core.view_profile_inner_join cvpij${
			profile.name_profile != '*'
				? ` where lower(cvpij.name_profile) LIKE '%${profile.name_profile}%' and cvpij.id_company = ${profile.company}`
				: ` where cvpij.id_company = ${profile.company}`
		} order by cvpij.id_profile desc`;

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

export const view_profile_specific_read = (profile: Profile) => {
	return new Promise<Profile[]>(async (resolve, reject) => {
		const query = `select * from core.view_profile_inner_join cvpij where cvpij.id_profile = ${profile.id_profile}`;

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

export const dml_profile_update = (profile: Profile) => {
	return new Promise<Profile[]>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_update_modified(${profile.id_user_},
			${profile.id_profile},
			${profile.company.id_company},
			'${profile.type_profile}',
			'${profile.name_profile}',
			'${profile.description_profile}',
			${profile.status_profile},
			${profile.deleted_profile})`;

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

export const dml_profile_delete = (profile: Profile) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_delete_modified(${profile.id_user_},${profile.id_profile}) as result`;

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
