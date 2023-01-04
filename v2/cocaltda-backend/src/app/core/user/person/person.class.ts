import { Academic } from './academic/academic.class';
import { _academic } from './academic/academic.data';
import { Job } from './job/job.class';
import { _job } from './job/job.data';

export class Person {
	/** Attributes */
	public id_user_?: number;
	public id_person: number;
	public academic: Academic;
	public job: Job;
	public dni_person?: string;
	public name_person?: string;
	public last_name_person?: string;
	public address_person?: string;
	public phone_person?: string;
	public deleted_person?: boolean;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_person: number = 0,
		academic: Academic = _academic,
		job: Job = _job,
		dni_person: string = '',
		name_person: string = '',
		last_name_person: string = '',
		address_person: string = '',
		phone_person: string = '',
		deleted_person: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_person = id_person;
		this.academic = academic;
		this.job = job;
		this.dni_person = dni_person;
		this.name_person = name_person;
		this.last_name_person = last_name_person;
		this.address_person = address_person;
		this.phone_person = phone_person;
		this.deleted_person = deleted_person;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_person(id_person: number) {
		this.id_person = id_person;
	}
	get _id_person() {
		return this.id_person;
	}

	set _academic(academic: Academic) {
		this.academic = academic;
	}
	get _academic() {
		return this.academic;
	}

	set _job(job: Job) {
		this.job = job;
	}
	get _job() {
		return this.job;
	}

	set _dni_person(dni_person: string) {
		this.dni_person = dni_person;
	}
	get _dni_person() {
		return this.dni_person!;
	}

	set _name_person(name_person: string) {
		this.name_person = name_person;
	}
	get _name_person() {
		return this.name_person!;
	}

	set _last_name_person(last_name_person: string) {
		this.last_name_person = last_name_person;
	}
	get _last_name_person() {
		return this.last_name_person!;
	}

	set _address_person(address_person: string) {
		this.address_person = address_person;
	}
	get _address_person() {
		return this.address_person!;
	}

	set _phone_person(phone_person: string) {
		this.phone_person = phone_person;
	}
	get _phone_person() {
		return this.phone_person!;
	}

	set _deleted_person(deleted_person: boolean) {
		this.deleted_person = deleted_person;
	}
	get _deleted_person() {
		return this.deleted_person!;
	}
}
