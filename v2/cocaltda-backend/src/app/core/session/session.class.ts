import { User } from '../user/user.class';
import { _user } from '../user/user.data';
import {
	dml_session_by_company_release_all,
	dml_session_by_session_release,
	dml_session_by_user_release_all,
	view_session_by_user_query_read,
	view_session_query_read,
	view_session_specific_read,
} from './session.store';

export class Session {
	/** Attributes */
	public id_user_?: number;
	public id_session: number;
	public user: User;
	public host_session?: string;
	public agent_session?: string;
	public date_sign_in_session?: string;
	public date_sign_out_session?: string;
	public status_session?: boolean;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_session: number = 0,
		user: User = _user,
		host_session: string = '',
		agent_session: string = '',
		date_sign_in_session: string = '',
		date_sign_out_session: string = '',
		status_session: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_session = id_session;
		this.user = user;
		this.host_session = host_session;
		this.agent_session = agent_session;
		this.date_sign_in_session = date_sign_in_session;
		this.date_sign_out_session = date_sign_out_session;
		this.status_session = status_session;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_session(id_session: number) {
		this.id_session = id_session;
	}
	get _id_session() {
		return this.id_session;
	}

	set _user(user: User) {
		this.user = user;
	}
	get _user() {
		return this.user;
	}

	set _host_session(host_session: string) {
		this.host_session = host_session;
	}
	get _host_session() {
		return this.host_session!;
	}

	set _agent_session(agent_session: string) {
		this.agent_session = agent_session;
	}
	get _agent_session() {
		return this.agent_session!;
	}

	set _date_sign_in_session(date_sign_in_session: string) {
		this.date_sign_in_session = date_sign_in_session;
	}
	get _date_sign_in_session() {
		return this.date_sign_in_session!;
	}

	set _date_sign_out_session(date_sign_out_session: string) {
		this.date_sign_out_session = date_sign_out_session;
	}
	get _date_sign_out_session() {
		return this.date_sign_out_session!;
	}

	set _status_session(status_session: boolean) {
		this.status_session = status_session;
	}
	get _status_session() {
		return this.status_session!;
	}

	/** Methods */
	queryRead() {
		return new Promise<Session[]>(async (resolve, reject) => {
			await view_session_query_read(this)
				.then((sessions: Session[]) => {
					/**
					 * Mutate response
					 */
					const _sessions = this.mutateResponse(sessions);

					resolve(_sessions);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byUserQueryRead() {
		return new Promise<Session[]>(async (resolve, reject) => {
			await view_session_by_user_query_read(this)
				.then((sessions: Session[]) => {
					/**
					 * Mutate response
					 */
					const _sessions = this.mutateResponse(sessions);

					resolve(_sessions);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Session>(async (resolve, reject) => {
			await view_session_specific_read(this)
				.then((sessions: Session[]) => {
					/**
					 * Mutate response
					 */
					const _sessions = this.mutateResponse(sessions);

					resolve(_sessions[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	bySessionRelease() {
		return new Promise<Session>(async (resolve, reject) => {
			await dml_session_by_session_release(this)
				.then((sessions: Session[]) => {
					/**
					 * Mutate response
					 */
					const _sessions = this.mutateResponse(sessions);

					resolve(_sessions[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byUserReleaseAll() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_session_by_user_release_all(this)
				.then((response: boolean) => {
					resolve(response);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	byCompanyReleaseAll() {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_session_by_company_release_all(this)
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
	 * @param sessions
	 * @returns
	 */
	private mutateResponse(sessions: Session[]): Session[] {
		let _sessions: Session[] = [];

		sessions.map((item: any) => {
			let _session: Session | any = {
				...item,
				user: {
					id_user: item.id_user,
					company: { id_company: item.id_company },
					person: { id_person: item.id_person },
					type_user: { id_type_user: item.id_type_user },
					name_user: item.name_user,
					password_user: item.password_user,
					avatar_user: item.avatar_user,
					status_user: item.status_user,
				},
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */

			delete _session.id_user;
			delete _session.id_company;
			delete _session.id_person;
			delete _session.id_type_user;
			delete _session.name_user;
			delete _session.password_user;
			delete _session.avatar_user;
			delete _session.status_user;

			_sessions.push(_session);
		});

		return _sessions;
	}
}
