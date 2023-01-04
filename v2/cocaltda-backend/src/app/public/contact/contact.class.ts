import { generateMail, sendMail } from '../../../utils/mail/mail';
import { formSendMail } from '../../../utils/mail/mail.declarate';

export class Contact {
	/** Attributes */
	public name: string;
	public email: string;
	public phone: string;
	public subject: string;
	public message: string;

	/** Constructor */
	constructor(
		name: string = '',
		email: string = '',
		phone: string = '',
		subject: string = '',
		message: string = ''
	) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.subject = subject;
		this.message = message;
	}
	/** Setters and Getters */
	set _name(name: string) {
		this.name = name;
	}
	get _name() {
		return this.name!;
	}

	set _email(email: string) {
		this.email = email;
	}
	get _email() {
		return this.email!;
	}

	set _phone(phone: string) {
		this.phone = phone;
	}
	get _phone() {
		return this.phone!;
	}

	set _subject(subject: string) {
		this.subject = subject;
	}
	get _subject() {
		return this.subject!;
	}

	set _message(message: string) {
		this.message = message;
	}
	get _message() {
		return this.message!;
	}
	/**
	 * formSend
	 */
	formSend() {
		return new Promise<String>(async (resolve, reject) => {
			const mailGenerado = generateMail(
				`"COCA LTDA." <${process.env.MAILER_USER}>`,
				`"${process.env.MAILER_USER_TRAFFIC}`,
				this.subject,
				formSendMail(this)
			);

			await sendMail(mailGenerado)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}
