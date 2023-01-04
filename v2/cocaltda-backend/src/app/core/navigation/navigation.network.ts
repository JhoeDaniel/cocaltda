import express from 'express';
import { error, success } from '../../../network/response';
import { MessageAPI } from '../../../utils/message/message.type';
import { Navigation } from './navigation.class';
import { validation } from './navigation.controller';
const routerNavigation = express.Router();

routerNavigation.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((navigation: Navigation) => {
			success(res, navigation);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerNavigation.get(
	'/queryRead/:name_navigation',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((navigations: Navigation[]) => {
				res.status(200).send(navigations);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerNavigation.get(
	'/byCompanyQueryRead/:company/:name_navigation',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((navigations: Navigation[]) => {
				res.status(200).send(navigations);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerNavigation.get(
	'/specificRead/:id_navigation',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((navigation: Navigation) => {
				res.status(200).send(navigation);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerNavigation.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((navigation: Navigation) => {
			success(res, navigation);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerNavigation.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerNavigation };
