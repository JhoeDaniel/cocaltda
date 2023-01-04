import express from 'express';
import { error, success } from '../../../network/response';
import { validation } from './contact.controller';
const routerContact = express.Router();

routerContact.post('/formSend', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

export { routerContact };
