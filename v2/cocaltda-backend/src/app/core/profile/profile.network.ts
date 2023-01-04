import express from 'express';
import { error, success } from '../../../network/response';
import { MessageAPI } from '../../../utils/message/message.type';
import { Profile } from './profile.class';
import { validation } from './profile.controller';
const routerProfile = express.Router();

routerProfile.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((profile: Profile) => {
			success(res, profile);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfile.get('/queryRead/:name_profile', async (req: any, res: any) => {
	await validation(req.params, req.url, req.headers.token)
		.then((profiles: Profile[]) => {
			res.status(200).send(profiles);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfile.get(
	'/byCompanyQueryRead/:company/:name_profile',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((profiles: Profile[]) => {
				res.status(200).send(profiles);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerProfile.get('/specificRead/:id_profile', async (req: any, res: any) => {
	await validation(req.params, req.url, req.headers.token)
		.then((profile: Profile) => {
			res.status(200).send(profile);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfile.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((profile: Profile) => {
			success(res, profile);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerProfile.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerProfile };
