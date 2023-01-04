import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { Profile, validationTypeProfile } from './profile.class';

export const validation = (profile: Profile, url: string, token: string) => {
	return new Promise<Profile | Profile[] | boolean | any>(
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
								profile.id_user_,
								'number',
								10
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'id_profile',
								profile.id_profile,
								'number',
								5
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							validationTypeProfile(
								'type_profile',
								profile.type_profile!
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'name_profile',
								profile.name_profile,
								'string',
								100
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'description_profile',
								profile.description_profile,
								'string',
								250
							).catch((err) => {
								validationStatus = true;
								reject(err);
							});
						}

						if (url == '/update') {
							attributeValidate(
								'status_profile',
								profile.status_profile,
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
								profile.company.id_company,
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
							const _profile = new Profile();
							/**
							 * Execute the url depending on the path
							 */
							if (url == '/create') {
								/** set required attributes for action */
								_profile.id_user_ = profile.id_user_;
								_profile.company = profile.company;
								await _profile
									.create()
									.then((_profile: Profile) => {
										resolve(_profile);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 10) == '/queryRead') {
								/** set required attributes for action */
								_profile.name_profile = profile.name_profile;
								await _profile
									.queryRead()
									.then((_profiles: Profile[]) => {
										resolve(_profiles);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 19) == '/byCompanyQueryRead') {
								const id_company: any = profile.company;

								if (id_company >= 1) {
									/** set required attributes for action */
									_profile.company = profile.company;
									_profile.name_profile = profile.name_profile;
									await _profile
										.byCompanyQueryRead()
										.then((_profiles: Profile[]) => {
											resolve(_profiles);
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
								const id_profile: any = profile.id_profile;

								if (id_profile >= 1) {
									/** set required attributes for action */
									_profile.id_profile = profile.id_profile;
									await _profile
										.specificRead()
										.then((_profile: Profile) => {
											resolve(_profile);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'profile'
										),
									});
								}
							} else if (url == '/update') {
								/** set required attributes for action */
								_profile.id_user_ = profile.id_user_;
								_profile.id_profile = profile.id_profile;
								_profile.company = profile.company;
								_profile.type_profile = profile.type_profile;
								_profile.name_profile = profile.name_profile;
								_profile.description_profile = profile.description_profile;
								_profile.status_profile = profile.status_profile;
								await _profile
									.update()
									.then((_profile: Profile) => {
										resolve(_profile);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 7) == '/delete') {
								/** set required attributes for action */
								_profile.id_user_ = profile.id_user_;
								_profile.id_profile = profile.id_profile;
								await _profile
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
