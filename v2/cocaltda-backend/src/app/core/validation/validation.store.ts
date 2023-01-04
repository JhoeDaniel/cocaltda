import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Validation } from './validation.class';

export const dml_validation_create = (validation: Validation) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_validation_create_modified(${validation.id_user_},${validation.company.id_company},'${validation.type_validation}')`;

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

export const view_validation_query_read = (validation: Validation) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.view_validation_inner_join cvvij${
			validation.message_validation != '*'
				? ` where lower(cvvij.message_validation) LIKE '%${validation.message_validation}%'`
				: ``
		} order by cvvij.id_validation desc`;

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

export const view_validation_by_company_query_read = (
	validation: Validation
) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.view_validation_inner_join cvvij${
			validation.message_validation != '*'
				? ` where lower(cvvij.message_validation) LIKE '%${validation.message_validation}%' and cvvij.id_company = ${validation.company}`
				: ` where cvvij.id_company = ${validation.company}`
		} order by cvvij.id_validation desc`;

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

export const view_validation_specific_read = (validation: Validation) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.view_validation_inner_join cvvij where cvvij.id_validation = ${validation.id_validation}`;

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

export const view_validation_by_type_validation_query_read = (
	validation: Validation
) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.view_validation_inner_join cvvij where cvvij.id_company = ${validation.company} and cvvij.type_validation = '${validation.type_validation}'`;

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

export const view_validation_inner_company_user = (
	type_validation: string,
	name_user: string,
	password_user: string
) => {
	return new Promise<Validation>(async (resolve, reject) => {
		const query = `select *, (select * from core.security_cap_aes_decrypt('${password_user}'))::character varying as password_user_decrypt from core.view_validation_inner_company_user v where v.type_validation = '${type_validation}' and v.name_user = '${name_user}'`;

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

export const dml_validation_update = (validation: Validation) => {
	return new Promise<Validation[]>(async (resolve, reject) => {
		const query = `select * from core.dml_validation_update_modified(${validation.id_user_},
			${validation.id_validation},
			${validation.company.id_company},
			'${validation.type_validation}',
			${validation.status_validation},
			'${validation.pattern_validation}',
			'${validation.message_validation}',
			${validation.deleted_validation})`;

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

export const dml_validation_delete = (validation: Validation) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_validation_delete(${validation.id_user_},${validation.id_validation}) as result`;

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
