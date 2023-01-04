import express from 'express';
import { error, success } from '../../../network/response';
import { uploadAvatar } from '../../../utils/fileStorage';
import { MessageAPI } from '../../../utils/message/message.type';
import { User } from './user.class';
import { validation } from './user.controller';
const routerUser = express.Router();

routerUser.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((user: User) => {
			success(res, user);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerUser.get('/queryRead/:name_user', async (req: any, res: any) => {
	await validation(req.params, req.url, req.headers.token)
		.then((users: User[]) => {
			res.status(200).send(users);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerUser.get(
	'/byCompanyQueryRead/:company/:name_user',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((users: User[]) => {
				res.status(200).send(users);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerUser.get(
	'/byTypeUserQueryRead/:type_user/:name_user',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((users: User[]) => {
				res.status(200).send(users);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerUser.get('/specificRead/:id_user', async (req: any, res: any) => {
	await validation(req.params, req.url, req.headers.token)
		.then((user: User) => {
			res.status(200).send(user);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerUser.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((user: User) => {
			success(res, user);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerUser.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerUser.post(
	'/uploadAvatar',
	uploadAvatar.single(`avatar`),
	async (req: any, res: any) => {
		await validation(req.body, req.url, req.headers.token)
			.then((response: any) => {
				success(res, response);
			})
			.catch((err) => {
				error(res, err);
			});
	}
);

routerUser.post('/removeAvatar', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err) => {
			error(res, err);
		});
});

routerUser.post('/reportUser', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((response: any) => {
			if (response.code == '06-010') {
				/**
				 * Set message in headers
				 * message in exposedHeaders (index.js)
				 */
				res.set('message', JSON.stringify(response));
				res.send();
			} else {
				/**
				 * Set name_report in headers
				 * name_report in exposedHeaders (index.js)
				 */
				res.set('name_report', response.name_report);
				/**
				 * Send the file
				 */
				/**
				 * workerKill in res.sendFile
				 */
				res.sendFile(response.pathFinal);
			}
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerUser };
