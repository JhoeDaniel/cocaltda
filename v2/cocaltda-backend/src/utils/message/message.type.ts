export interface MessageAPI {
	id: boolean;
	code: string;
	status: number;
	component: string;
	description: string;
}

export interface Messages {
	[key: number]: MessageAPI;
}
