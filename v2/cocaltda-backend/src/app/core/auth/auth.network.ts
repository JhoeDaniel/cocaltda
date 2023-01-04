import express from 'express';
import { error, success } from '../../../network/response';
import { getSession, validation } from './auth.controller';
const routerAuth = express.Router();

routerAuth.post('/sign-in', async (req: any, res: any) => {
	await validation(req.body, req.url, getSession(req))
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/refresh-access-token', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/unlock-session', async (req: any, res: any) => {
	await validation(req.body, req.url, getSession(req))
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/check-session', async (req: any, res: any) => {
	await validation(req.body, req.url, getSession(req))
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/sign-out', async (req: any, res: any) => {
	await validation(req.body, req.url, getSession(req))
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/forgot-password', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/reset-password', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/sign-up', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

routerAuth.post('/confirmation-required', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((response: any) => {
			success(res, response);
		})
		.catch((err: any) => {
			error(res, err);
		});
});

export { routerAuth };
