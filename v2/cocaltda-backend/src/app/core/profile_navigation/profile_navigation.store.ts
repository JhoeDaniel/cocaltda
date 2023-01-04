import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { ProfileNavigation } from './profile_navigation.class';

export const dml_profile_navigation_create = (
	profile_navigation: ProfileNavigation
) => {
	return new Promise<ProfileNavigation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_navigation_create_modified(${profile_navigation.id_user_},${profile_navigation.profile.id_profile})`;

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

export const view_profile_navigation_by_profile_read = (
	profile_navigation: ProfileNavigation
) => {
	return new Promise<ProfileNavigation[]>(async (resolve, reject) => {
		const query = `select * from core.view_profile_navigation_inner_join cvpnij where cvpnij.id_profile = ${profile_navigation.profile} order by cvpnij.id_profile_navigation asc`;

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

export const view_profile_navigation_specific_read = (
	profile_navigation: ProfileNavigation
) => {
	return new Promise<ProfileNavigation[]>(async (resolve, reject) => {
		const query = `select * from core.view_profile_navigation_inner_join cvpnij where cvpnij.id_profile_navigation = ${profile_navigation.id_profile_navigation}`;

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

export const dml_profile_navigation_update = (
	profile_navigation: ProfileNavigation
) => {
	return new Promise<ProfileNavigation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_navigation_update_modified(${profile_navigation.id_user_},
			${profile_navigation.id_profile_navigation},
			${profile_navigation.profile.id_profile},
			${profile_navigation.navigation.id_navigation})`;

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

export const dml_profile_navigation_delete = (
	profile_navigation: ProfileNavigation
) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_profile_navigation_delete(${profile_navigation.id_user_},${profile_navigation.id_profile_navigation}) as result`;

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
