import fs from 'fs';
import path from 'path';
import { verifyToken } from '../../utils/jwt';
import { _messages } from '../../utils/message/message';
import { Report } from './report.class';

export const validation = (report: Report, url: string, token: string) => {
	return new Promise<any>(async (resolve, reject) => {
		/**
		 * Capa de Autentificación con el token
		 */
		if (token) {
			await verifyToken(token)
				.then(async () => {
					/**
					 * Instance the class
					 */
					const _report = new Report();
					/**
					 * Execute the url depending on the path
					 */
					if (url.substring(0, 7) == '/delete') {
						/** set required attributes for action */
						_report.id_user_ = report.id_user_;
						_report.name_report = report.name_report;
						await _report
							.delete()
							.then((response: boolean) => {
								resolve(response);
							})
							.catch((error: any) => {
								reject(error);
							});
					} else if (url == '/downloadReport') {
						/** set required attributes for action */
						_report.name_report = report.name_report;

						const base_path_vocher: string = `/file_store/report/${_report.name_report}.pdf`;
						/**
						 * Construimos el finalPath
						 */
						const finalPath = `${path.resolve('./')}${base_path_vocher}`;
						/**
						 * Verificamos si el recurso existe
						 */
						if (fs.existsSync(finalPath)) {
							resolve(finalPath);
						} else {
							reject(_messages[10]);
						}
					}
				})
				.catch((error) => {
					reject(error);
				});
		} else {
			reject(_messages[5]);
		}
	});
};
