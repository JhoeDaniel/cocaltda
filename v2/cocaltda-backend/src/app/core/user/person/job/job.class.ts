export class Job {
	/** Attributes */
	public id_user_?: number;
	public id_job: number;
	public name_job?: string;
	public address_job?: string;
	public phone_job?: string;
	public position_job?: string;
	public deleted_job?: boolean;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_job: number = 0,
		name_job: string = '',
		address_job: string = '',
		phone_job: string = '',
		position_job: string = '',
		deleted_job: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_job = id_job;
		this.name_job = name_job;
		this.address_job = address_job;
		this.phone_job = phone_job;
		this.position_job = position_job;
		this.deleted_job = deleted_job;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_job(id_job: number) {
		this.id_job = id_job;
	}
	get _id_job() {
		return this.id_job;
	}

	set _name_job(name_job: string) {
		this.name_job = name_job;
	}
	get _name_job() {
		return this.name_job!;
	}

	set _address_job(address_job: string) {
		this.address_job = address_job;
	}
	get _address_job() {
		return this.address_job!;
	}

	set _phone_job(phone_job: string) {
		this.phone_job = phone_job;
	}
	get _phone_job() {
		return this.phone_job!;
	}

	set _position_job(position_job: string) {
		this.position_job = position_job;
	}
	get _position_job() {
		return this.position_job!;
	}

	set _deleted_job(deleted_job: boolean) {
		this.deleted_job = deleted_job;
	}
	get _deleted_job() {
		return this.deleted_job!;
	}
}
