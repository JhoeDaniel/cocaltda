import { _messages } from '../../../utils/message/message';
import { Company } from '../company/company.class';
import { _company } from '../company/company.data';
import {
	dml_validation_create,
	dml_validation_delete,
	dml_validation_update,
	view_validation_by_company_query_read,
	view_validation_by_type_validation_query_read,
	view_validation_query_read,
	view_validation_specific_read,
} from './validation.store';

export class Validation {
	/** Attributes */
	public id_user_?: number;
	public id_validation: number;
	public company: Company;
	public type_validation?: TYPE_VALIDATION;
	public status_validation?: boolean;
	public pattern_validation?: string;
	public message_validation?: string;
	public deleted_validation?: boolean;

	public password_user_decrypt!: string;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_validation: number = 0,
		company: Company = _company,
		type_validation: TYPE_VALIDATION = 'validationPassword',
		status_validation: boolean = false,
		pattern_validation: string = '',
		message_validation: string = '',
		deleted_validation: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_validation = id_validation;
		this.company = company;
		this.type_validation = type_validation;
		this.status_validation = status_validation;
		this.pattern_validation = pattern_validation;
		this.message_validation = message_validation;
		this.deleted_validation = deleted_validation;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_validation(id_validation: number) {
		this.id_validation = id_validation;
	}
	get _id_validation() {
		return this.id_validation;
	}

	set _company(company: Company) {
		this.company = company;
	}
	get _company() {
		return this.company;
	}

	set _type_validation(type_validation: TYPE_VALIDATION) {
		this.type_validation = type_validation;
	}
	get _type_validation() {
		return this.type_validation!;
	}

	set _status_validation(status_validation: boolean) {
		this.status_validation = status_validation;
	}
	get _status_validation() {
		return this.status_validation!;
	}

	set _pattern_validation(pattern_validation: string) {
		this.pattern_validation = pattern_validation;
	}
	get _pattern_validation() {
		return this.pattern_validation!;
	}

	set _message_validation(message_validation: string) {
		this.message_validation = message_validation;
	}
	get _message_validation() {
		return this.message_validation!;
	}

	set _deleted_validation(deleted_validation: boolean) {
		this.deleted_validation = deleted_validation;
	}
	get _deleted_validation() {
		return this.deleted_validation!;
	}

	/** Methods */
	create() {
		return new Promise<Validation>(async (resolve, reject) => {
			await dml_validation_create(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	queryRead() {
		return new Promise<Validation[]>(async (resolve, reject) => {
			await view_validation_query_read(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byCompanyQueryRead() {
		return new Promise<Validation[]>(async (resolve, reject) => {
			await view_validation_by_company_query_read(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Validation>(async (resolve, reject) => {
			await view_validation_specific_read(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byTypeValidationQueryRead() {
		return new Promise<Validation>(async (resolve, reject) => {
			await view_validation_by_type_validation_query_read(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	update() {
		return new Promise<Validation>(async (resolve, reject) => {
			await dml_validation_update(this)
				.then((validations: Validation[]) => {
					/**
					 * Mutate response
					 */
					const _validations = this.mutateResponse(validations);

					resolve(_validations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	delete() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_validation_delete(this)
				.then((response: boolean) => {
					resolve(response);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param validations
	 * @returns
	 */
	private mutateResponse(validations: Validation[]): Validation[] {
		let _validations: Validation[] = [];

		validations.map((item: any) => {
			let _validation: Validation | any = {
				...item,
				company: {
					id_company: item.id_company,
					setting: { id_setting: item.id_setting },
					name_company: item.name_company,
					acronym_company: item.acronym_company,
					address_company: item.address_company,
					status_company: item.status_company,
				},
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */

			delete _validation.id_company;
			delete _validation.id_setting;
			delete _validation.name_company;
			delete _validation.acronym_company;
			delete _validation.address_company;
			delete _validation.status_company;

			_validations.push(_validation);
		});

		return _validations;
	}
}

/**
 * Type Enum TYPE_VALIDATION
 */
export type TYPE_VALIDATION =
	| 'validationPassword'
	| 'validationDNI'
	| 'validationPhoneNumber';

export interface TYPE_VALIDATION_ENUM {
	name_type: string;
	value_type: TYPE_VALIDATION;
}

export const _typeValidation: TYPE_VALIDATION_ENUM[] = [
	{
		name_type: 'Validación de contraseña',
		value_type: 'validationPassword',
	},
	{
		name_type: 'Validación de DNI',
		value_type: 'validationDNI',
	},
	{
		name_type: 'Validación de teléfono',
		value_type: 'validationPhoneNumber',
	},
];

export const validationTypeValidation = (
	attribute: string,
	value: string | TYPE_VALIDATION
) => {
	return new Promise<Boolean>((resolve, reject) => {
		const typeValidation = _typeValidation.find(
			(typeValidation: TYPE_VALIDATION_ENUM) =>
				typeValidation.value_type == value
		);

		if (!typeValidation) {
			reject({
				..._messages[7],
				description: _messages[7].description
					.replace('_nameAttribute', `${attribute}`)
					.replace('_expectedType', 'TYPE_VALIDATION'),
			});
		}
	});
};

/**
 * Type Enum TYPE_VALIDATION
 */
