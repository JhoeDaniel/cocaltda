import { Company } from '../company/company.class';
import { _company } from '../company/company.data';
import { Profile } from '../profile/profile.class';
import { _profile } from '../profile/profile.data';
import {
	dml_type_user_create,
	dml_type_user_delete,
	dml_type_user_update,
	view_type_user_by_company_query_read,
	view_type_user_by_profile_query_read,
	view_type_user_query_read,
	view_type_user_specific_read,
} from './type_user.store';

export class TypeUser {
	/** Attributes */
	public id_user_?: number;
	public id_type_user: number;
	public company: Company;
	public profile: Profile;
	public name_type_user?: string;
	public description_type_user?: string;
	public status_type_user?: boolean;
	public deleted_type_user?: boolean;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_type_user: number = 0,
		company: Company = _company,
		profile: Profile = _profile,
		name_type_user: string = '',
		description_type_user: string = '',
		status_type_user: boolean = false,
		deleted_type_user: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_type_user = id_type_user;
		this.company = company;
		this.profile = profile;
		this.name_type_user = name_type_user;
		this.description_type_user = description_type_user;
		this.status_type_user = status_type_user;
		this.deleted_type_user = deleted_type_user;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_type_user(id_type_user: number) {
		this.id_type_user = id_type_user;
	}
	get _id_type_user() {
		return this.id_type_user;
	}

	set _company(company: Company) {
		this.company = company;
	}
	get _company() {
		return this.company;
	}

	set _profile(profile: Profile) {
		this.profile = profile;
	}
	get _profile() {
		return this.profile;
	}

	set _name_type_user(name_type_user: string) {
		this.name_type_user = name_type_user;
	}
	get _name_type_user() {
		return this.name_type_user!;
	}

	set _description_type_user(description_type_user: string) {
		this.description_type_user = description_type_user;
	}
	get _description_type_user() {
		return this.description_type_user!;
	}

	set _status_type_user(status_type_user: boolean) {
		this.status_type_user = status_type_user;
	}
	get _status_type_user() {
		return this.status_type_user!;
	}

	set _deleted_type_user(deleted_type_user: boolean) {
		this.deleted_type_user = deleted_type_user;
	}
	get _deleted_type_user() {
		return this.deleted_type_user!;
	}

	/** Methods */
	create() {
		return new Promise<TypeUser>(async (resolve, reject) => {
			await dml_type_user_create(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	queryRead() {
		return new Promise<TypeUser[]>(async (resolve, reject) => {
			await view_type_user_query_read(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byCompanyQueryRead() {
		return new Promise<TypeUser[]>(async (resolve, reject) => {
			await view_type_user_by_company_query_read(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byProfileQueryRead() {
		return new Promise<TypeUser[]>(async (resolve, reject) => {
			await view_type_user_by_profile_query_read(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<TypeUser>(async (resolve, reject) => {
			await view_type_user_specific_read(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	update() {
		return new Promise<TypeUser>(async (resolve, reject) => {
			await dml_type_user_update(this)
				.then((typeUsers: TypeUser[]) => {
					/**
					 * Mutate response
					 */
					const _typeUsers = this.mutateResponse(typeUsers);

					resolve(_typeUsers[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	delete() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_type_user_delete(this)
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
	 * @param typeUsers
	 * @returns
	 */
	private mutateResponse(typeUsers: TypeUser[]): TypeUser[] {
		let _typeUsers: TypeUser[] = [];

		typeUsers.map((item: any) => {
			let _typeUser: TypeUser | any = {
				...item,
				company: {
					id_company: item.id_company,
					setting: { id_setting: item.id_setting },
					name_company: item.name_company,
					acronym_company: item.acronym_company,
					address_company: item.address_company,
					status_company: item.status_company,
				},
				profile: {
					id_profile: item.id_profile,
					company: { id_company: item.id_company },
					type_profile: item.type_profile,
					name_profile: item.name_profile,
					description_profile: item.description_profile,
					status_profile: item.status_profile,
				},
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */

			delete _typeUser.id_company;
			delete _typeUser.id_setting;
			delete _typeUser.name_company;
			delete _typeUser.acronym_company;
			delete _typeUser.address_company;
			delete _typeUser.status_company;
			delete _typeUser.id_profile;
			delete _typeUser.id_company;
			delete _typeUser.type_profile;
			delete _typeUser.name_profile;
			delete _typeUser.description_profile;
			delete _typeUser.status_profile;

			_typeUsers.push(_typeUser);
		});

		return _typeUsers;
	}
}
