import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Attachments, Mail } from './mail.types';
/**
 * sendMail
 * @param message
 * @param _SMTPTransport
 * @returns
 */
export const sendMail = (
	message: Mail,
	_SMTPTransport: SMTPTransport | any = {
		host: process.env.MAILER_HOST,
		port: parseInt(`${process.env.MAILER_PORT}`),
		secure: false,
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASSWORD,
		},
	}
): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		try {
			/**
			 * Crear transporter con la configuración del app.config -> Nota: Si la integracion es
			 * con gmail se debe poner la clave de aplicaciones en el password y el secure es igual a true
			 * Ejemplo:
			 * host: 'smtp.gmail.com'
			 * port: 465
			 * secure: true
			 * user: 'angelloor.dev@gmail.com'
			 * password: 'kyiufepifrcassms'
			 */
			const transporter = nodemailer.createTransport(_SMTPTransport);
			/**
			 * sending
			 */
			transporter
				.sendMail(message)
				.then(() => {
					resolve(`MessageAPI: email sent to ${message.to}`);
				})
				.catch((error: any) => {
					reject(error.toString());
				});
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
/**
 * generateMail
 * @param mail
 * @param subject
 * @param html
 * @param attachments
 * @returns string
 */
export const generateMail = (
	from: string,
	mail: string,
	subject: string,
	html: string,
	attachments: Attachments[] = []
): Mail => {
	return {
		from: from,
		to: mail,
		subject: subject,
		html: html,
		attachments: attachments,
	};
};
