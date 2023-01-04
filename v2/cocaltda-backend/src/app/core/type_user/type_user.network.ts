import express from 'express';
import { error, success } from '../../../network/response';
import { MessageAPI } from '../../../utils/message/message.type';
import { TypeUser } from './type_user.class';
import { validation } from './type_user.controller';
const routerTypeUser = express.Router();

routerTypeUser.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((typeUser: TypeUser) => {
			success(res, typeUser);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerTypeUser.get('/queryRead/:name_type_user', async (req: any, res: any) => {
	await validation(req.params, req.url, req.headers.token)
		.then((typeUsers: TypeUser[]) => {
			res.status(200).send(typeUsers);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerTypeUser.get(
	'/byCompanyQueryRead/:company/:name_type_user',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((typeUsers: TypeUser[]) => {
				res.status(200).send(typeUsers);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerTypeUser.get(
	'/byProfileQueryRead/:profile/:name_type_user',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((typeUsers: TypeUser[]) => {
				res.status(200).send(typeUsers);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerTypeUser.get(
	'/specificRead/:id_type_user',
	async (req: any, res: any) => {
		await validation(req.params, req.url, req.headers.token)
			.then((typeUser: TypeUser) => {
				res.status(200).send(typeUser);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

routerTypeUser.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url, req.headers.token)
		.then((typeUser: TypeUser) => {
			success(res, typeUser);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerTypeUser.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url, req.headers.token)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

export { routerTypeUser };
