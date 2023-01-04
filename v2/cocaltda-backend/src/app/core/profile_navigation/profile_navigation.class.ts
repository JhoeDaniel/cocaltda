import { Navigation } from '../navigation/navigation.class';
import { _navigation } from '../navigation/navigation.data';
import { Profile } from '../profile/profile.class';
import { _profile } from '../profile/profile.data';
import {
	dml_profile_navigation_create,
	dml_profile_navigation_delete,
	dml_profile_navigation_update,
	view_profile_navigation_by_profile_read,
	view_profile_navigation_specific_read,
} from './profile_navigation.store';

export class ProfileNavigation {
	/** Attributes */
	public id_user_?: number;
	public id_profile_navigation: number;
	public profile: Profile;
	public navigation: Navigation;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_profile_navigation: number = 0,
		profile: Profile = _profile,
		navigation: Navigation = _navigation
	) {
		this.id_user_ = id_user_;
		this.id_profile_navigation = id_profile_navigation;
		this.profile = profile;
		this.navigation = navigation;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_profile_navigation(id_profile_navigation: number) {
		this.id_profile_navigation = id_profile_navigation;
	}
	get _id_profile_navigation() {
		return this.id_profile_navigation;
	}

	set _profile(profile: Profile) {
		this.profile = profile;
	}
	get _profile() {
		return this.profile;
	}

	set _navigation(navigation: Navigation) {
		this.navigation = navigation;
	}
	get _navigation() {
		return this.navigation;
	}

	/** Methods */
	create() {
		return new Promise<ProfileNavigation>(async (resolve, reject) => {
			await dml_profile_navigation_create(this)
				.then((profileNavigations: ProfileNavigation[]) => {
					/**
					 * Mutate response
					 */
					const _profileNavigations = this.mutateResponse(profileNavigations);

					resolve(_profileNavigations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byProfileRead() {
		return new Promise<ProfileNavigation[]>(async (resolve, reject) => {
			await view_profile_navigation_by_profile_read(this)
				.then((profileNavigations: ProfileNavigation[]) => {
					/**
					 * Mutate response
					 */
					const _profileNavigations = this.mutateResponse(profileNavigations);

					resolve(_profileNavigations);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<ProfileNavigation>(async (resolve, reject) => {
			await view_profile_navigation_specific_read(this)
				.then((profileNavigations: ProfileNavigation[]) => {
					/**
					 * Mutate response
					 */
					const _profileNavigations = this.mutateResponse(profileNavigations);

					resolve(_profileNavigations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	update() {
		return new Promise<ProfileNavigation>(async (resolve, reject) => {
			await dml_profile_navigation_update(this)
				.then((profileNavigations: ProfileNavigation[]) => {
					/**
					 * Mutate response
					 */
					const _profileNavigations = this.mutateResponse(profileNavigations);

					resolve(_profileNavigations[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	delete() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_profile_navigation_delete(this)
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
	 * @param profileNavigations
	 * @returns
	 */
	private mutateResponse(
		profileNavigations: ProfileNavigation[]
	): ProfileNavigation[] {
		let _profileNavigations: ProfileNavigation[] = [];

		profileNavigations.map((item: any) => {
			let _profileNavigation: ProfileNavigation | any = {
				...item,
				profile: {
					id_profile: item.id_profile,
					company: { id_company: item.id_company },
					type_profile: item.type_profile,
					name_profile: item.name_profile,
					description_profile: item.description_profile,
					status_profile: item.status_profile,
				},
				navigation: {
					id_navigation: item.id_navigation,
					company: { id_company: item.id_company },
					name_navigation: item.name_navigation,
					description_navigation: item.description_navigation,
					type_navigation: item.type_navigation,
					status_navigation: item.status_navigation,
					content_navigation: item.content_navigation,
				},
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */

			delete _profileNavigation.id_profile;
			delete _profileNavigation.id_company;
			delete _profileNavigation.type_profile;
			delete _profileNavigation.name_profile;
			delete _profileNavigation.description_profile;
			delete _profileNavigation.status_profile;
			delete _profileNavigation.id_navigation;
			delete _profileNavigation.id_company;
			delete _profileNavigation.name_navigation;
			delete _profileNavigation.description_navigation;
			delete _profileNavigation.type_navigation;
			delete _profileNavigation.status_navigation;
			delete _profileNavigation.content_navigation;

			_profileNavigations.push(_profileNavigation);
		});

		return _profileNavigations;
	}
}
