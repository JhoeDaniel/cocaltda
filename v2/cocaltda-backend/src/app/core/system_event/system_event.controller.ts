import { verifyToken } from '../../../utils/jwt';
import { _messages } from '../../../utils/message/message';
import { SystemEvent } from './system_event.class';

export const validation = (
	system_event: SystemEvent,
	url: string,
	token: string
) => {
	return new Promise<SystemEvent | SystemEvent[] | boolean | any>(
		async (resolve, reject) => {
			/**
			 * Capa de Autentificación con el token
			 */
			let validationStatus: boolean = false;

			if (token) {
				await verifyToken(token)
					.then(async () => {
						/**
						 * Continuar solo si no ocurrio errores en la validación
						 */
						if (!validationStatus) {
							/**
							 * Instance the class
							 */
							const _system_event = new SystemEvent();
							/**
							 * Execute the url depending on the path
							 */
							if (url.substring(0, 10) == '/queryRead') {
								/** set required attributes for action */
								_system_event.table_system_event =
									system_event.table_system_event;
								await _system_event
									.queryRead()
									.then((_systemEvents: SystemEvent[]) => {
										resolve(_systemEvents);
									})
									.catch((error: any) => {
										reject(error);
									});
							} else if (url.substring(0, 16) == '/byUserQueryRead') {
								const id_user: any = system_event.user;

								if (id_user >= 1) {
									/** set required attributes for action */
									_system_event.user = system_event.user;
									_system_event.table_system_event =
										system_event.table_system_event;
									await _system_event
										.byUserQueryRead()
										.then((_system_events: SystemEvent[]) => {
											resolve(_system_events);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'user'
										),
									});
								}
							} else if (url.substring(0, 13) == '/specificRead') {
								const id_system_event: any = system_event.id_system_event;

								if (id_system_event >= 1) {
									/** set required attributes for action */
									_system_event.id_system_event = system_event.id_system_event;
									await _system_event
										.specificRead()
										.then((_systemEvent: SystemEvent) => {
											resolve(_systemEvent);
										})
										.catch((error: any) => {
											reject(error);
										});
								} else {
									reject({
										..._messages[11],
										description: _messages[11].description.replace(
											'name_entity',
											'system_event'
										),
									});
								}
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
