import multer from 'multer';

const _storageAvatar = multer.diskStorage({
	destination: (req: any, file: Express.Multer.File, cb) => {
		cb(null, './');
	},
	filename: (req: any, file: Express.Multer.File, cb) => {
		cb(null, file.fieldname + '.jpg');
	},
});

const _storageLogo = multer.diskStorage({
	destination: (req: any, file: Express.Multer.File, cb) => {
		cb(null, './');
	},
	filename: (req: any, file: Express.Multer.File, cb) => {
		cb(null, file.fieldname + '.png');
	},
});

const _storageFile = multer.diskStorage({
	destination: (req: any, file: Express.Multer.File, cb) => {
		cb(null, './');
	},
	filename: (req: any, file: Express.Multer.File, cb) => {
		cb(null, file.originalname);
	},
});

export const uploadAvatar = multer({ storage: _storageAvatar });
export const uploadLogo = multer({ storage: _storageLogo });
export const uploadFile = multer({ storage: _storageFile });
