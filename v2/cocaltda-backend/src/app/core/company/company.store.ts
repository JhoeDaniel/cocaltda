import { clientCOCALTDAPostgreSQL } from '../../../utils/conections';
import { _messages } from '../../../utils/message/message';
import { Company } from './company.class';

export const dml_company_create = (company: Company) => {
	return new Promise<Company[]>(async (resolve, reject) => {
		const query = `select * from core.dml_company_create_modified(${company.id_user_})`;

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

export const view_company_query_read = (company: Company) => {
	return new Promise<Company[]>(async (resolve, reject) => {
		const query = `select * from core.view_company_inner_join cvcij${
			company.name_company != '*'
				? ` where lower(cvcij.name_company) LIKE '%${company.name_company}%'`
				: ``
		} order by cvcij.id_company desc`;

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

export const view_company_by_setting_query_read = (company: Company) => {
	return new Promise<Company[]>(async (resolve, reject) => {
		const query = `select * from core.view_company_inner_join cvcij${
			company.name_company != '*'
				? ` where lower(cvcij.name_company) LIKE '%${company.name_company}%' and cvcij.id_setting = ${company.setting}`
				: ` where cvcij.id_setting = ${company.setting}`
		} order by cvcij.id_company desc`;

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

export const view_company_specific_read = (company: Company) => {
	return new Promise<Company[]>(async (resolve, reject) => {
		const query = `select * from core.view_company_inner_join cvcij where cvcij.id_company = ${company.id_company}`;

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

export const dml_company_update = (company: Company) => {
	return new Promise<Company[]>(async (resolve, reject) => {
		const query = `select * from core.dml_company_update_modified(${company.id_user_},
			${company.id_company},
			${company.setting.id_setting},
			'${company.name_company}',
			'${company.acronym_company}',
			'${company.address_company}',
			${company.status_company},
			${company.deleted_company},
			${company.setting.expiration_token},
			${company.setting.expiration_verification_code},
			${company.setting.inactivity_time},
			${company.setting.session_limit},
			${company.setting.save_log},
			${company.setting.save_file_alfresco},
			${company.setting.modification_status})`;

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

export const dml_company_delete = (company: Company) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from core.dml_company_delete_modified(${company.id_user_},${company.id_company}) as result`;

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
