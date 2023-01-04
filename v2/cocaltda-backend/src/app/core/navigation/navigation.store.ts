import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Navigation } from './navigation.class';

export const dml_navigation_create = (navigation: Navigation) => {
	return new Promise<Navigation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_navigation_create_modified(${navigation.id_user_},${navigation.company.id_company},'${navigation.type_navigation}')`;

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

export const view_navigation_query_read = (navigation: Navigation) => {
	return new Promise<Navigation[]>(async (resolve, reject) => {
		const query = `select * from core.view_navigation_inner_join cvnij${
			navigation.name_navigation != '*'
				? ` where lower(cvnij.name_navigation) LIKE '%${navigation.name_navigation}%'`
				: ``
		} order by cvnij.id_navigation desc`;

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

export const view_navigation_by_company_query_read = (
	navigation: Navigation
) => {
	return new Promise<Navigation[]>(async (resolve, reject) => {
		const query = `select * from core.view_navigation_inner_join cvnij${
			navigation.name_navigation != '*'
				? ` where lower(cvnij.name_navigation) LIKE '%${navigation.name_navigation}%' and cvnij.id_company = ${navigation.company}`
				: ` where cvnij.id_company = ${navigation.company}`
		} order by cvnij.id_navigation desc`;

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

export const view_navigation_specific_read = (navigation: Navigation) => {
	return new Promise<Navigation[]>(async (resolve, reject) => {
		const query = `select * from core.view_navigation_inner_join cvnij where cvnij.id_navigation = ${navigation.id_navigation}`;

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

export const dml_navigation_update = (navigation: Navigation) => {
	return new Promise<Navigation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_navigation_update_modified(${
			navigation.id_user_
		},
			${navigation.id_navigation},
			${navigation.company.id_company},
			'${navigation.name_navigation}',
			'${navigation.description_navigation}',
			'${navigation.type_navigation}',
			${navigation.status_navigation},
			'${JSON.stringify(navigation.content_navigation)}',
			${navigation.deleted_navigation})`;

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

export const dml_navigation_delete = (navigation: Navigation) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_navigation_delete(${navigation.id_user_},${navigation.id_navigation}) as result`;

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
