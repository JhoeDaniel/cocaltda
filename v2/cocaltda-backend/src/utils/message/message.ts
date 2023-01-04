import { Messages } from './message.type';

export const _messages: Messages = {
	1: {
		id: true,
		code: '01-001',
		status: 200,
		component: 'success',
		description: 'Transaction Ok!',
	},
	2: {
		id: false,
		code: '02-002',
		status: 500,
		component: 'unknown',
		description: 'Excepción desconocida: ExCePcIoN',
	},
	3: {
		id: false,
		code: '03-003',
		status: 400,
		component: 'database',
		description: 'Database MessageAPI',
	},
	4: {
		id: false,
		code: '04-004',
		status: 400,
		component: 'auth',
		description: 'No Autorizado!',
	},
	5: {
		id: false,
		code: '04-005',
		status: 400,
		component: 'auth',
		description: 'No se ha recibido el token',
	},
	6: {
		id: false,
		code: '05-006',
		status: 400,
		component: 'validations',
		description: 'No se ha recibido el _nameAttribute',
	},
	7: {
		id: false,
		code: '05-007',
		status: 400,
		component: 'validations',
		description:
			'El tipo de dato de _nameAttribute es incorrecto, se esperaba _expectedType',
	},
	8: {
		id: false,
		code: '05-008',
		status: 400,
		component: 'validations',
		description:
			'La longitud de _nameAttribute no puede ser mayor a _expectedCharacters caracteres',
	},
	9: {
		id: false,
		code: '05-009',
		status: 400,
		component: 'validations',
		description:
			'El formato de la contraseña no cumple con su formato establecido (_establishedFormat)',
	},
	10: {
		id: false,
		code: '06-010',
		status: 400,
		component: 'report',
		description: 'No se encontraron datos para generar el reporte',
	},
	11: {
		id: false,
		code: '005-011',
		status: 400,
		component: 'validations',
		description: 'El id_name_entity no paso con la validación para la busqueda',
	},
	12: {
		id: false,
		code: '005-015',
		status: 400,
		component: 'validations',
		description:
			'La fecha ingresada value_date no paso la validación checkDateString()',
	},
};

export const _businessMessages: Messages = {
	1: {
		id: false,
		code: '07-012',
		status: 400,
		component: 'business',
		description: 'MessageAPI',
	},
};
