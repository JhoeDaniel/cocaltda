import express from 'express';
import { error } from '../../../network/response';
import { MessageAPI } from '../../../utils/message/message.type';
import { SystemEvent } from './system_event.class';
import { validation } from './system_event.controller';
const routerSystemEvent = express.Router();

routerSystemEvent.get(
	'/queryRead/:table_system_event',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((systemEvents: SystemEvent[]) => {
				res.status(200).send(systemEvents);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerSystemEvent.get(
	'/byUserQueryRead/:user/:table_system_event',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((systemEvents: SystemEvent[]) => {
				res.status(200).send(systemEvents);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerSystemEvent.get(
	'/specificRead/:id_system_event',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((systemEvent: SystemEvent) => {
				res.status(200).send(systemEvent);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

export { routerSystemEvent };
