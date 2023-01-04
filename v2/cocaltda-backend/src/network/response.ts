import { _messages } from '../utils/message/message';
import { MessageAPI } from '../utils/message/message.type';

export const success = (res: any, body: any) => {
	res.status(_messages[1].status || 200).send({
		..._messages[1],
		body,
	});
};

export const error = async (res: any, message: MessageAPI) => {
	if (message.status) {
		res.status(message.status || 500).send(message);
	} else {
		res.status(500).send({
			..._messages[2],
			description: _messages[2].description.replace('ExCePcIoN', `${message}`),
		});
	}
};
