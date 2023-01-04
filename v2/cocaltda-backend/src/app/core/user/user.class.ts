import fs from 'fs';
import path from 'path';
import { generateRandomNumber } from '../../../utils/global';
import { _messages } from '../../../utils/message/message';
import { Report } from '../../report/report.class';
import { reportUser } from '../../report/report.declarate';
import { Company } from '../company/company.class';
import { _company } from '../company/company.data';
import { TypeUser } from '../type_user/type_user.class';
import { _typeUser } from '../type_user/type_user.data';
import { Person } from './person/person.class';
import { _person } from './person/person.data';
import {
    dml_user_create,
    dml_user_delete,
    dml_user_remove_avatar,
    dml_user_update,
    dml_user_upload_avatar,
    view_user_by_company_query_read,
    view_user_by_type_user_query_read,
    view_user_query_read,
    view_user_specific_read
} from './user.store';

export class User {
	/** Attributes */
	public id_user_?: number;
	public id_user: number;
	public company: Company;
	public person: Person;
	public type_user: TypeUser;
	public name_user?: string;
	public password_user?: string;
	public avatar_user?: string;
	public status_user?: boolean;
	public deleted_user?: boolean;

	public avatar_path_base: string;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_user: number = 0,
		company: Company = _company,
		person: Person = _person,
		type_user: TypeUser = _typeUser,
		name_user: string = '',
		password_user: string = '',
		avatar_user: string = '',
		status_user: boolean = false,
		deleted_user: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_user = id_user;
		this.company = company;
		this.person = person;
		this.type_user = type_user;
		this.name_user = name_user;
		this.password_user = password_user;
		this.avatar_user = avatar_user;
		this.status_user = status_user;
		this.deleted_user = deleted_user;

		this.avatar_path_base = './public/resource/img/avatar';
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_user(id_user: number) {
		this.id_user = id_user;
	}
	get _id_user() {
		return this.id_user;
	}

	set _company(company: Company) {
		this.company = company;
	}
	get _company() {
		return this.company;
	}

	set _person(person: Person) {
		this.person = person;
	}
	get _person() {
		return this.person;
	}

	set _type_user(type_user: TypeUser) {
		this.type_user = type_user;
	}
	get _type_user() {
		return this.type_user;
	}

	set _name_user(name_user: string) {
		this.name_user = name_user;
	}
	get _name_user() {
		return this.name_user!;
	}

	set _password_user(password_user: string) {
		this.password_user = password_user;
	}
	get _password_user() {
		return this.password_user!;
	}

	set _avatar_user(avatar_user: string) {
		this.avatar_user = avatar_user;
	}
	get _avatar_user() {
		return this.avatar_user!;
	}

	set _status_user(status_user: boolean) {
		this.status_user = status_user;
	}
	get _status_user() {
		return this.status_user!;
	}

	set _deleted_user(deleted_user: boolean) {
		this.deleted_user = deleted_user;
	}
	get _deleted_user() {
		return this.deleted_user!;
	}

	/** Methods */
	create() {
		return new Promise<User>(async (resolve, reject) => {
			await dml_user_create(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	queryRead() {
		return new Promise<User[]>(async (resolve, reject) => {
			await view_user_query_read(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byCompanyQueryRead() {
		return new Promise<User[]>(async (resolve, reject) => {
			await view_user_by_company_query_read(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byTypeUserQueryRead() {
		return new Promise<User[]>(async (resolve, reject) => {
			await view_user_by_type_user_query_read(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<User>(async (resolve, reject) => {
			await view_user_specific_read(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	update() {
		return new Promise<User>(async (resolve, reject) => {
			await dml_user_update(this)
				.then((users: User[]) => {
					/**
					 * Mutate response
					 */
					const _users = this.mutateResponse(users);

					resolve(_users[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	delete() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_user_delete(this)
				.then((response: boolean) => {
					resolve(response);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	uploadAvatar() {
		return new Promise<any>(async (resolve, reject) => {
			const initialPath = `./avatar.jpg`;
			if (fs.existsSync(initialPath)) {
				const ramdomNumber: string = generateRandomNumber(6);
				const newAvatarPath = `avatar-${this.id_user}-${ramdomNumber}.jpg`;

				await dml_user_upload_avatar(this, newAvatarPath)
					.then((response: any) => {
						if (response.old_path != '') {
							this.deleteAvatar(this.avatar_path_base, response.old_path);
						}

						const pathBasePublic = `./public`;
						if (!fs.existsSync(pathBasePublic)) {
							fs.mkdir(pathBasePublic, (error) => {
								if (error) {
									reject(`Ocurrió un error al crear la carpeta public`);
								}
							});
						}

						const pathBaseResource = `./public/resource`;
						if (!fs.existsSync(pathBaseResource)) {
							fs.mkdir(pathBaseResource, (error) => {
								if (error) {
									reject(`Ocurrió un error al crear la carpeta resource`);
								}
							});
						}

						const pathBaseImg = `./public/resource/img`;
						if (!fs.existsSync(pathBaseImg)) {
							fs.mkdir(pathBaseImg, (error) => {
								if (error) {
									reject(`Ocurrió un error al crear la carpeta img`);
								}
							});
						}

						const pathBaseAvatar = `./public/resource/img/avatar`;
						if (!fs.existsSync(pathBaseAvatar)) {
							fs.mkdir(pathBaseAvatar, (error) => {
								if (error) {
									reject(`Ocurrió un error al crear la carpeta avatar`);
								}
							});
						}

						fs.rename(
							`./avatar.jpg`,
							`${pathBaseAvatar}/${newAvatarPath}`,
							(err) => {
								if (err) {
									reject(err);
								} else {
									resolve(response);
								}
							}
						);
					})
					.catch((error: any) => {
						reject(error);
					});
			} else {
				reject(false);
			}
		});
	}

	removeAvatar() {
		return new Promise<any>(async (resolve, reject) => {
			await dml_user_remove_avatar(this)
				.then((response: any) => {
					this.deleteAvatar(this.avatar_path_base, response.current_path);
					resolve(response);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	deleteAvatar = (avatar_path_base: string, old_path: string) => {
		if (old_path && old_path != 'default.svg') {
			const path = `${avatar_path_base}/${old_path}`;
			if (fs.existsSync(path)) {
				fs.unlinkSync(path);
			}
		}
	};
	/**
	 * Reports
	 */
	reportUser() {
		return new Promise<any>(async (resolve, reject) => {
			await view_user_query_read(this)
				.then(async (users: User[]) => {
					if (users.length > 0) {
						/**
						 * Mutate response
						 */
						const _users = this.mutateResponse(users);

						const name_report = `reportUser${generateRandomNumber(9)}`;

						const pathFinal = `${path.resolve(
							'./'
						)}/file_store/report/${name_report}.pdf`;
						/**
						 * Generar html
						 */
						const html = await reportUser(_users);
						/**
						 * Instance the class
						 */
						const _report = new Report();

						const landscape: boolean = false;

						await _report
							.generateReport(name_report, html, landscape)
							.then(() => {
								resolve({ pathFinal, name_report });
							})
							.catch((error: any) => {
								reject(error);
							});
					} else {
						reject(_messages[10]);
					}
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}
	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param users
	 * @returns
	 */
	private mutateResponse(users: User[]): User[] {
		let _users: User[] = [];

		users.map((item: any) => {
			let _user: User | any = {
				...item,
				company: {
					id_company: item.id_company,
					setting: { id_setting: item.id_setting },
					name_company: item.name_company,
					acronym_company: item.acronym_company,
					address_company: item.address_company,
					status_company: item.status_company,
				},
				person: {
					id_person: item.id_person,
					academic: {
						id_academic: item.id_academic,
						title_academic: item.title_academic,
						abbreviation_academic: item.abbreviation_academic,
						level_academic: item.level_academic,
					},
					job: {
						id_job: item.id_job,
						name_job: item.name_job,
						address_job: item.address_job,
						phone_job: item.phone_job,
						position_job: item.position_job,
					},
					dni_person: item.dni_person,
					name_person: item.name_person,
					last_name_person: item.last_name_person,
					address_person: item.address_person,
					phone_person: item.phone_person,
				},
				type_user: {
					id_type_user: item.id_type_user,
					company: { id_company: item.id_company },
					profile: { id_profile: item.id_profile },
					name_type_user: item.name_type_user,
					description_type_user: item.description_type_user,
					status_type_user: item.status_type_user,
				},
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */

			delete _user.id_company;
			delete _user.id_setting;
			delete _user.name_company;
			delete _user.acronym_company;
			delete _user.address_company;
			delete _user.status_company;
			delete _user.id_person;
			delete _user.id_academic;
			delete _user.id_job;

			delete _user.title_academic;
			delete _user.abbreviation_academic;
			delete _user.level_academic;
			delete _user.name_job;
			delete _user.address_job;
			delete _user.phone_job;
			delete _user.position_job;

			delete _user.dni_person;
			delete _user.name_person;
			delete _user.last_name_person;
			delete _user.address_person;
			delete _user.phone_person;
			delete _user.id_type_user;
			delete _user.id_company;
			delete _user.id_profile;
			delete _user.name_type_user;
			delete _user.description_type_user;
			delete _user.status_type_user;

			_users.push(_user);
		});

		return _users;
	}
}
