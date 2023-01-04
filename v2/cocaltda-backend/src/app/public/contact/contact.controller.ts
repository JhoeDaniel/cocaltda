import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Contact } from './contact.class';

export const validation = (contact: Contact, url: string, token: string) => {
	return new Promise<Contact | Contact[] | boolean | any>(
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

						if (url == '/formSend') {
							attributeValidate('name', contact.name, 'string', 100).catch(
								(err) => {
									validationStatus = true;
									reject(err);
								}
							);
						}

						if (url == '/formSend') {
							attributeValidate('email', contact.email, 'string', 256).catch(
								(err) => {
									validationStatus = true;
									reject(err);
								}
							);
						}

						if (url == '/formSend') {
							attributeValidate('phone', contact.phone, 'string', 13).catch(
								(err) => {
									validationStatus = true;
									reject(err);
								}
							);
						}

						if (url == '/formSend') {
							attributeValidate('subject', contact.subject, 'string', 50).catch(
								(err) => {
									validationStatus = true;
									reject(err);
								}
							);
						}

						if (url == '/formSend') {
							attributeValidate(
								'message',
								contact.message,
								'string',
								1000000
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
							const _contact = new Contact();
							/**
							 * Execute the url depending on the path
							 */
							if (url == '/formSend') {
								/** set required attributes for action */
								_contact.name = contact.name;
								_contact.email = contact.email;
								_contact.phone = contact.phone;
								_contact.subject = contact.subject;
								_contact.message = contact.message;
								await _contact
									.formSend()
									.then((_response) => {
										resolve(_response);
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
