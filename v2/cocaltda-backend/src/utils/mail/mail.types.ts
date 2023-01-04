export interface Attachments {
	filename: string;
	path?: string;
	content?: string;
	contentType?: string;
}

export interface Mail {
	from: string;
	to: string;
	subject: string;
	html: string;
	attachments: Attachments[];
}
