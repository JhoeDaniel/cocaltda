export interface User {
	id_user?: number;
	company: Company;
	person: Person;
	type_user?: TypeUser;
	name_user?: string;
	password_user?: string;
	avatar_user?: string;
	status_user?: boolean;
}

export interface Company {
	id_company: number;
	setting: Setting;
	name_company?: string;
	status_company?: boolean;
}

export interface Setting {
	id_setting: number;
	expiration_token?: number;
	expiration_verification_code?: number;
	inactivity_time?: number;
}
export interface Person {
	id_person?: number;
	dni_person?: string;
	name_person?: string;
	last_name_person?: string;
	address_person?: string;
	phone_person?: string;
}

export interface TypeUser {
	id_type_user?: number;
	profile: Profile;
	name_type_user?: string;
	description_type_user?: string;
	status_type_user?: string;
}

export interface Profile {
	id_profile?: number;
	type_profile?: string;
	name_profile?: string;
	description_profile?: string;
	status_profile?: string;
}

export interface AppInitialData {
	access_token?: string;
	user?: User;
	navigation?: {
		compact: [];
		default: [];
		futuristic: [];
		horizontal: [];
	};
	messages?: [];
	notifications?: [];
	shortcuts?: [];
}

export interface Session {
	host: string;
	agent?: {
		browser: string;
		version: string;
		os: string;
		platform: string;
		source: string;
	};
}

export interface Payload {
	id_session: string;
	name_user: string;
	name_person: string;
	last_name_person?: string;
	company: Company;
	iat?: number;
	exp?: number;
}
