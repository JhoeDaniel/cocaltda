import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import useragent from 'express-useragent';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { appRoutes } from './network/routes';
const app = express();

process.setMaxListeners(0);

dotenv.config({
	path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});

const whitelist: string[] = [
	'http://localhost:4200',
	`http://${process.env.SERVICE_DOMAIN}`,
	`https://${process.env.SERVICE_DOMAIN}`,
];
/**
 * Cors middleware configuration
 * @param req
 * @param callback
 */
const corsOptionsDelegate = (req: any, callback: any) => {
	let corsOptions = {
		origin: false,
		optionsSuccessStatus: 200,
		exposedHeaders: ['name_report', 'message'],
	};

	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		/**
		 * Reflect (enable) the requested origin in the CORS response
		 */
		corsOptions = { ...corsOptions, origin: true };
	} else {
		/**
		 * Disable CORS for this request
		 */
		corsOptions = { ...corsOptions, origin: false };
	}
	/**
	 * Callback expects two parameters: error and options
	 */
	callback(null, corsOptions);
};

app.use(useragent.express());
app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('./public'));

app.get('/*', (req: any, res: any, next: any) => {
	/**
	 * Condition the url, if is rest then continue opposite case redirect html, because they are assumed to be webapp routes
	 */
	if (
		!(req.url.substring(1, 5) == 'rest' || req.url.substring(1, 4) == 'app')
	) {
		res.sendFile(
			path.join(path.resolve('./'), 'public/index.html'),
			(err: any) => {
				if (err) {
					res.status(500).send(err);
				}
			}
		);
	} else {
		next();
	}
});

appRoutes(app);

if (process.env.IS_SECURE === 'true') {
	/**
	 * Redirect http to https
	 */
	if (process.env.NODE_ENV == 'production') {
		app.enable('trust proxy');
		app.use((req, res, next) => {
			req.secure
				? next()
				: res.redirect('https://' + process.env.SERVICE_DOMAIN + +req.url);
		});
	}
	/**
	 * Set the credentials
	 */
	const credentials = {
		cert: fs.readFileSync(path.resolve('./public.crt')),
		key: fs.readFileSync(path.resolve('./private.key')),
	};
	/**
	 * Start Https server
	 */
	var httpsServer = https.createServer(credentials, app);
	httpsServer.listen(process.env.PORT_SECURE);
} else {
	/**
	 * Start Http server
	 */
	var httpServer = http.createServer(app);
	httpServer.listen(process.env.PORT);
}

console.log(
	`The app is listening on http${
		process.env.IS_SECURE === 'true' ? 's' : ''
	}://localhost:${process.env.PORT} PID ${process.pid}`
);
