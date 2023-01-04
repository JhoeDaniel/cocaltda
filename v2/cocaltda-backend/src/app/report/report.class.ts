import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

export class Report {
	/** Attributes */
	public id_user_: number;
	public name_report: string;
	/** Constructor */
	constructor(id_user_: number = 0, name_report: string = '') {
		this.id_user_ = id_user_;
		this.name_report = name_report;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_;
	}

	set _name_report(name_report: string) {
		this.name_report = name_report;
	}
	get _name_report() {
		return this.name_report;
	}

	/** Methods */
	generateReport = (name_report: string, html: string, landscape: boolean) => {
		return new Promise<boolean>(async (resolve, reject) => {
			/**
			 * generatePath
			 */
			await this.generatePath().catch((error) => {
				reject(error);
			});
			/**
			 * generateHTML
			 */
			await this.generateHTML(name_report, html).catch((error) => {
				reject(error);
			});
			/**
			 * generateHTML
			 */
			await this.generatePDF(name_report, landscape).catch((error) => {
				reject(error);
			});
			/**
			 * cleanDirectory
			 */
			await this.cleanDirectory(name_report).catch((error) => {
				reject(error);
			});
			resolve(true);
		});
	};

	generatePath() {
		return new Promise<boolean>(async (resolve, reject) => {
			const pathBase: string = `./file_store`;

			// Generate Path base
			if (!fs.existsSync(pathBase)) {
				fs.mkdir(pathBase, (error) => {
					if (error) {
						reject(`Ocurrió un error al crear la carpeta base`);
					}
				});
			}

			const pathUserTask: string = `./file_store/report`;
			// Generate Path user_task
			if (!fs.existsSync(pathUserTask)) {
				fs.mkdir(pathUserTask, (error) => {
					if (error) {
						reject(`Ocurrió un error al crear la carpeta report`);
					}
				});
			}

			resolve(true);
		});
	}

	delete() {
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				fs.unlinkSync(`./file_store/report/${this.name_report}.pdf`);
				resolve(true);
			} catch (error: any) {
				reject(error.toString());
			}
		});
	}

	generateHTML = (name_report: string, html: string) => {
		return new Promise<boolean>((resolve, reject) => {
			try {
				fs.writeFileSync(`${path.resolve('./')}/${name_report}.html`, html);
				resolve(true);
			} catch (error: any) {
				reject(error.toString());
			}
		});
	};

	generatePDF = (name_report: string, landscape: boolean) => {
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const urlBase = 'file://' + path.resolve('./').replace(/\\/g, '/');
				const browser = await puppeteer.launch({
					ignoreDefaultArgs: ['--disable-extensions'],
					headless: true,
					args: ['--no-sandbox'],
				});
				const page = await browser.newPage();
				await page.goto(`${urlBase}/${name_report}.html`, {
					waitUntil: 'networkidle0',
				});
				const pdf = await page.pdf({ format: 'a4', landscape: landscape });
				await browser.close();

				if (!fs.existsSync('file_store/report')) {
					fs.mkdirSync('file_store/report');
					fs.writeFileSync(`file_store/report/${name_report}.pdf`, pdf);
				} else {
					fs.writeFileSync(`file_store/report/${name_report}.pdf`, pdf);
				}
				resolve(true);
			} catch (error: any) {
				reject(error.toString());
			}
		});
	};

	cleanDirectory = (name_report: string) => {
		return new Promise<boolean>((resolve, reject) => {
			try {
				fs.unlinkSync(`${path.resolve('./')}/${name_report}.html`);
				resolve(true);
			} catch (error: any) {
				reject(error.toString());
			}
		});
	};
}
