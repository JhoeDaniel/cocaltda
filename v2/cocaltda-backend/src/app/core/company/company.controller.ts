import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Company } from './company.class';

export const validation = (company: Company, url: string, token: string) => {
	return new Promise<Company | Company[] | boolean | any>(
		async (resolve, reject) => {
			/**
			 * Capa de Autentificación con el token
			 */
			let validationStatus: boolean = false;

			if (token) {
				await verifyToken(token)
					.then(async () => {
						/**
						 * Capa de validaciones
						 */
						if (url == '/create' || url == '/update') {
							attributeValidate(
								'id_user_',
								company.id_user_,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'id_company',
								company.id_company,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'name_company',
								company.name_company,
								'string',
								100
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'acronym_company',
								company.acronym_company,
								'string',
								50
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'address_company',
								company.address_company,
								'string',
								250
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'status_company',
								company.status_company,
								'boolean'
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						/**
						 * Validation setting
						 */

						if (url == '/update') {
							attributeValidate(
								'id_setting',
								company.setting.id_setting,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'expiration_token',
								company.setting.expiration_token,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'expiration_verification_code',
								company.setting.expiration_verification_code,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'inactivity_time',
								company.setting.inactivity_time,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'session_limit',
								company.setting.session_limit,
								'number',
								3
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'save_log',
								company.setting.save_log,
								'boolean'
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'save_file_alfresco',
								company.setting.save_file_alfresco,
								'boolean'
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'modification_status',
								company.setting.modification_status,
								'boolean'
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						/**
						 * Continuar solo si no ocurrio errores en la validación
						 */
						if (!validationStatus) {
							/**
							 * Instance the class
							 */
							const _company = new Company();
							/**
							 * Execute the url depending on the path
							 */
							if (url == '/create') {
								/** set required attributes for action */
								_company.id_user_ = company.id_user_;
								await _company
									.create()
									.then((_company: Company) => {
										resolve(_company);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 10) == '/queryRead') {
								/** set required attributes for action */
								_company.name_company = company.name_company;
								await _company
									.queryRead()
									.then((_companys: Company[]) => {
										resolve(_companys);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 19) == '/bySettingQueryRead') {
								const id_setting: any = company.setting;

								if (id_setting >= 1) {
									/** set required attributes for action */
									_company.setting = company.setting;
									_company.name_company = company.name_company;
									await _company
										.bySettingQueryRead()
										.then((_companys: Company[]) => {
											resolve(_companys);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'setting'
										),
									});
								}
							} else if (url.substring(0, 13) == '/specificRead') {
								const id_company: any = company.id_company;

								if (id_company >= 1) {
									/** set required attributes for action */
									_company.id_company = company.id_company;
									await _company
										.specificRead()
										.then((_company: Company) => {
											resolve(_company);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'company'
										),
									});
								}
							} else if (url == '/update') {
								/** set required attributes for action */
								_company.id_user_ = company.id_user_;
								_company.id_company = company.id_company;
								_company.setting = company.setting;
								_company.name_company = company.name_company;
								_company.acronym_company = company.acronym_company;
								_company.address_company = company.address_company;
								_company.status_company = company.status_company;
								await _company
									.update()
									.then((_company: Company) => {
										resolve(_company);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 7) == '/delete') {
								/** set required attributes for action */
								_company.id_user_ = company.id_user_;
								_company.id_company = company.id_company;
								await _company
									.delete()
									.then((response: boolean) => {
										resolve(response);
									})
									.catch((error: any) => {
										reject(error);
									});
							}
						}
					})
					.catch((error) => {
						reject(error);
					});
			} else {
				reject(_messages[5]);
			}
		}
	);
};

/**
 * Función para validar un campo de acuerdo a los criterios ingresados
 * @param attribute nombre del atributo a validar
 * @param value valor a validar
 * @param type tipo de dato correcto del atributo (string, number, boolean, object)
 * @param _length longitud correcta del atributo
 * @returns true || error
 */
const attributeValidate = (
	attribute: string,
	value: any,
	type: string,
	_length: number = 0
) => {
	return new Promise<Boolean>((resolve, reject) => {
		if (value != undefined || value != null) {
			if (typeof value == `${type}`) {
				if (typeof value == 'string' || typeof value == 'number') {
					if (value.toString().length > _length) {
						reject({
							..._messages[8],
							description: _messages[8].description
								.replace('_nameAttribute', `${attribute}`)
								.replace('_expectedCharacters', `${_length}`),
						});
					} else {
						resolve(true);
					}
				} else {
					resolve(true);
				}
			} else {
				reject({
					..._messages[7],
					description: _messages[7].description
						.replace('_nameAttribute', `${attribute}`)
						.replace('_expectedType', `${type}`),
				});
			}
		} else {
			reject({
				..._messages[6],
				description: _messages[6].description.replace(
					'_nameAttribute',
					`${attribute}`
				),
			});
		}
	});
};
