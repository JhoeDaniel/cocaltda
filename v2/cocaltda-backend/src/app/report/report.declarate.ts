import { getFullDate } from '../../utils/date';
import { generateImage2B64 } from '../../utils/global';

import { User } from '../core/user/user.class';
/**
 * reportUser
 * @param users
 * @returns
 */
export const reportUser = async (users: User[]) => {
	return new Promise<string>(async (resolve) => {
		const generateRow = (users: User[]) => {
			let rowResult: string = '';
			users.map((item: User, index: number) => {
				rowResult += `<tr>
								<td>${index + 1}</td>
								<td>${item.name_user}</td>
								<td>${item.person.name_person}</td>
								<td>${item.person.last_name_person}</td>
								<td>${item.status_user}</td>
							</tr>
						`;
			});
			return rowResult;
		};

		const html: string = `<!DOCTYPE html>
		<html>
		
		<head>
			<meta charset="UTF-8">
			${STYLES}
		</head>
		<body>
			<div class="reporte">
				${await generateHeader('Reporte de usuarios')}
				<div class="containerBody">
					<div class="title">
						<h2>Usuarios</h2>
					</div>
					<table class="tableInst">
						<thead>
							<tr>
								<td>#</td>
								<td>name_user</td>
								<td>name_person</td>
								<td>last_name_person</td>
								<td>status_user</td>
							</tr>
						</thead>
						<tbody>
						${users.length > 0 ? `${generateRow(users)}` : ''}		
						</tbody>
					</table>
				</div>
			</div>
		</body>
		
		</html>`;
		resolve(html);
	});
};
/**
 * STYLES
 */
const STYLES: string = `<style>
body {
	display: flex;
	align-items: center;
	background-color: gray;
	justify-content: center;
	font-family: "Times New Roman", Times, serif;
}

.reporte {
	width: 930px;
	height: auto;
	background-color: white;
	padding: 30px;
	padding-top: 20px;
}

.reporte>.header {
	display: flex;
	align-items: center;
	justify-content: center;
}

.reporte>.header>.containerLogo {
	width: 20%;
}

.reporte>.header>.containerLogo>img {
	width: 100%;
}

.reporte>.header>.containerTitle {
	display: flex;
	flex-direction: column;
	align-items: flex;
	justify-content: center;
	width: 80%;
	margin-left: 30px;
}

.reporte>.header>.containerTitle>h1 {
	color: black;
	font-size: 22px;
	font-weight: bold;
	margin: 2px;
}

.reporte>.header>.containerTitle>h2 {
	color: black;
	font-size: 16px;
	font-weight: 300;
	margin: 2px;
}

.reporte>.header>.containerTitle>h3 {
	color: black;
	font-size: 12px;
	font-weight: 300;
	margin: 2px;
}

.reporte>.containerBody>.title>h2 {
	color: black;
	font-size: 16px;
	font-weight: bold;
	padding: 0px 6px;
}

.reporte>.containerBody>.tableInst {
	width: 100%;
}

.reporte>.containerBody>.tableInst>thead>tr>td {
	color: black;
	font-size: 12px;
	font-weight: bold;
	padding: 5px 5px;

}

.reporte>.containerBody>.tableInst>tbody>tr>td {
	color: black;
	font-size: 12px;
	font-weight: lighter;
	padding: 1px 5px;
}

.reporte>.containerBody>.tableInst>tbody>.total>td {
	color: black;
	font-size: 13px;
	font-weight: bold;
	padding: 1px 5px;
}
</style>`;
/**
 * generateHeader
 * @returns header string
 */
const generateHeader = (
	title: string,
	query_parameters: string = ''
): Promise<string> => {
	return new Promise<string>(async (resolve, reject) => {
		/**
		 * Generate Base64 information for the logo
		 */
		try {
			let b64Logo = await generateImage2B64(`./public/resource/img/logo.png`);
			const _getFullDate = getFullDate(new Date().toString());

			resolve(`<div class="header">
				<div class="containerLogo">
					<img src="data:image/png;base64, ${b64Logo}" alt="logo">
				</div>
				<div class="containerTitle">
					<h1>COCALTDA</h1>
					<h2>${title}</h2>${query_parameters}
					<h3><strong>Generado: </strong>${_getFullDate.day}-${_getFullDate.month}-${_getFullDate.fullYear} ${_getFullDate.hours}:${_getFullDate.minutes}:${_getFullDate.seconds}</h3>
				</div>
			</div>`);
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
