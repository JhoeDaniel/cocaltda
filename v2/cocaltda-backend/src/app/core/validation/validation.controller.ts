import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Validation, validationTypeValidation } from './validation.class';

export const validation = (
	validation: Validation,
	url: string,
	token: string
) => {
	return new Promise<Validation | Validation[] | boolean | any>(
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
								validation.id_user_,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'id_validation',
								validation.id_validation,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/create' || url == '/update') {
							validationTypeValidation(
								'type_validation',
								validation.type_validation!
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'status_validation',
								validation.status_validation,
								'boolean'
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'pattern_validation',
								validation.pattern_validation,
								'string',
								500
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'message_validation',
								validation.message_validation,
								'string',
								250
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						/**
						 * Validation company
						 */

						if (url == '/create' || url == '/update') {
							attributeValidate(
								'id_company',
								validation.company.id_company,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}
						/**
						//  * Continuar solo si no ocurrio errores en la validación
						 */
						if (!validationStatus) {
							/**
							 * Instance the class
							 */
							const _validation = new Validation();
							/**
							 * Execute the url depending on the path
							 */
							if (url == '/create') {
								/** set required attributes for action */
								_validation.id_user_ = validation.id_user_;
								_validation.company = validation.company;
								_validation.type_validation = validation.type_validation;
								await _validation
									.create()
									.then((_validation: Validation) => {
										resolve(_validation);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 10) == '/queryRead') {
								/** set required attributes for action */
								_validation.message_validation = validation.message_validation;
								await _validation
									.queryRead()
									.then((_validations: Validation[]) => {
										resolve(_validations);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 19) == '/byCompanyQueryRead') {
								const id_company: any = validation.company;

								if (id_company >= 1) {
									/** set required attributes for action */
									_validation.company = validation.company;
									_validation.message_validation =
										validation.message_validation;
									await _validation
										.byCompanyQueryRead()
										.then((_validations: Validation[]) => {
											resolve(_validations);
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
							} else if (url.substring(0, 13) == '/specificRead') {
								const id_validation: any = validation.id_validation;

								if (id_validation >= 1) {
									/** set required attributes for action */
									_validation.id_validation = validation.id_validation;
									await _validation
										.specificRead()
										.then((_validation: Validation) => {
											resolve(_validation);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'validation'
										),
									});
								}
							} else if (url.substring(0, 26) == '/byTypeValidationQueryRead') {
								const id_company: any = validation.company;
								if (id_company >= 1) {
									/** set required attributes for action */
									_validation.company = validation.company;
									_validation.type_validation = validation.type_validation;
									await _validation
										.byTypeValidationQueryRead()
										.then((_validation: Validation) => {
											resolve(_validation);
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
								_validation.id_user_ = validation.id_user_;
								_validation.id_validation = validation.id_validation;
								_validation.company = validation.company;
								_validation.type_validation = validation.type_validation;
								_validation.status_validation = validation.status_validation;
								_validation.pattern_validation = validation.pattern_validation;
								_validation.message_validation = validation.message_validation;
								await _validation
									.update()
									.then((_validation: Validation) => {
										resolve(_validation);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 7) == '/delete') {
								/** set required attributes for action */
								_validation.id_user_ = validation.id_user_;
								_validation.id_validation = validation.id_validation;
								await _validation
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
