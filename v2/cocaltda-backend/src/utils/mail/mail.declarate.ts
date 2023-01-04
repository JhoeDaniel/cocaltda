import { Contact } from '../../app/public/contact/contact.class';

export const defaultMail = () => {
	const html: string = `<h1>Hola mundo!</h1>`;
	return html;
};

export const forgotPasswordMail = (code: string, expiration: number) => {
	const html: string = `
	<div>
		<strong>Estimado(a).</strong>
		<br>
		<br>
		<p>Usted ha solicitado restablecer su contraseña, para poder continuar con la acción tiene que ingresar el siguiente código.</p>
		<strong>Codigo de confirmación: ${code}</strong><br>
		<strong>Tiempo de expiración: ${expiration} ${
		expiration > 1 ? `segundos` : `segundo`
	}</strong><br><br>
	 	<strong>SALUDOS CORDIALES.</strong>
	 	<br>
	</div>`;
	return html;
};

export const formSendMail = (contact: Contact) => {
	const html: string = `
	<div>
		<strong>Estimada Coop. Coca LTDA.</strong>
		<p><strong>Nombre:</strong> ${contact.name}</p>
		<p><strong>Correo electrónico:</strong> ${contact.email}</p>
		<p><strong>Teléfono:</strong> ${contact.phone}</p>
		<p>${contact.message}</p>
	 	<strong>Saludos Cordiales.</strong>
	</div>`;
	return html;
};
