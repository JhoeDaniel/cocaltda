import express from 'express';
import { error, success } from '../../../network/response';
import { validation } from './index.controller';
const routerIndex = express.Router();

routerIndex.get('/getPageData', async (req: any, res: any) => {
	await validation(req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

export { routerIndex };
