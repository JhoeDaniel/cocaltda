import express from 'express';
import { error, success } from '../../network/response';
import { MessageAPI } from '../../utils/message/message.type';
import { validation } from './report.controller';
const routerReport = express.Router();

routerReport.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerReport.post('/downloadReport', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((data: string) => {
			res.sendFile(data);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerReport };
