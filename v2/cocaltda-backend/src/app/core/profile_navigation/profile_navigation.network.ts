import express from 'express';
import { error, success } from '../../../network/response';
import { MessageAPI } from '../../../utils/message/message.type';
import { ProfileNavigation } from './profile_navigation.class';
import { validation } from './profile_navigation.controller';
const routerProfileNavigation = express.Router();

routerProfileNavigation.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((profileNavigation: ProfileNavigation) => {
			success(res, profileNavigation);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfileNavigation.get(
	'/byProfileRead/:profile',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((profileNavigations: ProfileNavigation[]) => {
				res.status(200).send(profileNavigations);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerProfileNavigation.get(
	'/specificRead/:id_profile_navigation',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((profileNavigation: ProfileNavigation) => {
				res.status(200).send(profileNavigation);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerProfileNavigation.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((profileNavigation: ProfileNavigation) => {
			success(res, profileNavigation);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfileNavigation.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerProfileNavigation };
