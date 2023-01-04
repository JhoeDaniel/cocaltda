import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Navigation, validationTypeNavigation } from './navigation.class';

export const validation = (
	navigation: Navigation,
	url: string,
	token: string
) => {
	return new Promise<Navigation | Navigation[] | boolean | any>(
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
								navigation.id_user_,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'id_navigation',
								navigation.id_navigation,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'name_navigation',
								navigation.name_navigation,
								'string',
								100
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'description_navigation',
								navigation.description_navigation,
								'string',
								250
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/create' || url == '/update') {
							validationTypeNavigation(
								'type_navigation',
								navigation.type_navigation!
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'status_navigation',
								navigation.status_navigation,
								'boolean'
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
								navigation.company.id_company,
								'number',
								5
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
							const _navigation = new Navigation();
							/**
							 * Execute the url depending on the path
							 */
							if (url == '/create') {
								/** set required attributes for action */
								_navigation.id_user_ = navigation.id_user_;
								_navigation.company = navigation.company;
								_navigation.type_navigation = navigation.type_navigation;
								await _navigation
									.create()
									.then((_navigation: Navigation) => {
										resolve(_navigation);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 10) == '/queryRead') {
								/** set required attributes for action */
								_navigation.name_navigation = navigation.name_navigation;
								await _navigation
									.queryRead()
									.then((_navigations: Navigation[]) => {
										resolve(_navigations);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 19) == '/byCompanyQueryRead') {
								const id_company: any = navigation.company;

								if (id_company >= 1) {
									/** set required attributes for action */
									_navigation.company = navigation.company;
									_navigation.name_navigation = navigation.name_navigation;
									await _navigation
										.byCompanyQueryRead()
										.then((_navigations: Navigation[]) => {
											resolve(_navigations);
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
								const id_navigation: any = navigation.id_navigation;

								if (id_navigation >= 1) {
									/** set required attributes for action */
									_navigation.id_navigation = navigation.id_navigation;
									await _navigation
										.specificRead()
										.then((_navigation: Navigation) => {
											resolve(_navigation);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'navigation'
										),
									});
								}
							} else if (url == '/update') {
								/** set required attributes for action */
								_navigation.id_user_ = navigation.id_user_;
								_navigation.id_navigation = navigation.id_navigation;
								_navigation.company = navigation.company;
								_navigation.name_navigation = navigation.name_navigation;
								_navigation.description_navigation =
									navigation.description_navigation;
								_navigation.type_navigation = navigation.type_navigation;
								_navigation.status_navigation = navigation.status_navigation;
								_navigation.content_navigation = navigation.content_navigation;
								await _navigation
									.update()
									.then((_navigation: Navigation) => {
										resolve(_navigation);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 7) == '/delete') {
								/** set required attributes for action */
								_navigation.id_user_ = navigation.id_user_;
								_navigation.id_navigation = navigation.id_navigation;
								await _navigation
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
