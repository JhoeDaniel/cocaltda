import express from 'express';
import { error, success } from '../../../network/response';
import { validation } from './auth.controller';
const routerAuth = express.Router();

routerAuth.post('/sign-in', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

export { routerAuth };

