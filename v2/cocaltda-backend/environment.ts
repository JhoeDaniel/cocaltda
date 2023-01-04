declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			IS_SECURE: string;
			PORT_SECURE: string;
			SERVICE_DOMAIN: string;
			BD_PG_USER: string;
			BD_PG_HOST: string;
			BD_PG_DATABASE: string;
			BD_PG_PASSWORD: string;
			BD_PG_PORT: string;
			MAILER_HOST: string;
			MAILER_PORT: string;
			MAILER_SECURE: string;
			MAILER_USER: string;
			MAILER_USER_TRAFFIC: string;
			MAILER_PASSWORD: string;
			KEY_JWT: string;
			PASS_ENCRYPT: string;
		}
	}
}

export {};
