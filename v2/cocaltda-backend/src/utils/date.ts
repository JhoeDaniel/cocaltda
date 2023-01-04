export interface FullDate {
	fullYear: number;
	month: string;
	day: string;
	hours: string;
	minutes: string;
	seconds: string;
	milliSeconds: number;
}
/**
 * Return { day, month, fullYear, hours, minutes, seconds, milliSeconds }
 */
export const getFullDate = (stringDate: string): FullDate => {
	var date: Date = new Date(stringDate);
	/**
	 * Add suport for the date with -5 hours
	 */
	if (stringDate.length === 4 || stringDate.length === 10) {
		date.setHours(date.getHours() + 5);
	}

	return {
		fullYear: date.getFullYear(),
		month: addCeroNumber(date.getMonth() + 1),
		day: addCeroNumber(date.getDate()),
		hours: addCeroNumber(date.getHours()),
		minutes: addCeroNumber(date.getMinutes()),
		seconds: addCeroNumber(date.getSeconds()),
		milliSeconds: date.getMilliseconds(),
	};
};
/**
 * checkDateString
 * @param stringDate
 * @returns
 */
export const checkDateString = (stringDate: string): Promise<FullDate> => {
	return new Promise<FullDate>((resolve, reject) => {
		try {
			const date = new Date(stringDate);

			if (
				!(
					(
						getFullDate(date.toString()).day === 'NaN' ||
						getFullDate(date.toString()).month === 'NaN' ||
						// getFullDate(date.toString()).fullYear === NaN ||
						getFullDate(date.toString()).hours === 'NaN' ||
						getFullDate(date.toString()).minutes === 'NaN' ||
						getFullDate(date.toString()).seconds === 'NaN'
					)
					// getFullDate(date.toString()).milliSeconds === NaN
				)
			) {
				resolve(getFullDate(stringDate));
			} else {
				reject();
			}
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
/**
 * parseDateToString
 * Return YYYY/MM/DDTHH:MM:SS.MSZ
 */
export const parseDateToString = (date: Date) => {
	return `${date.getFullYear()}-${addCeroNumber(
		date.getMonth() + 1
	)}-${addCeroNumber(date.getDate())}T${addCeroNumber(
		date.getHours()
	)}:${addCeroNumber(date.getMinutes())}:${addCeroNumber(date.getSeconds())}.${
		date.getMilliseconds() == 0 ? '000' : date.getMilliseconds()
	}Z`;
};
/**
 * parseDateToStringWithTimeZone
 * Return YYYY/MM/DDTHH:MM:SS-05:00
 */
export const parseDateToStringWithTimeZone = (date: Date) => {
	return `${date.getFullYear()}-${addCeroNumber(
		date.getMonth() + 1
	)}-${addCeroNumber(date.getDate())}T${addCeroNumber(
		date.getHours()
	)}:${addCeroNumber(date.getMinutes())}:${addCeroNumber(
		date.getSeconds()
	)}-05:00`;
};
/**
 * createDateAsUTC -5
 */
export const createDateAsUTC = (initialDate: Date) => {
	return new Date(
		Date.UTC(
			initialDate.getFullYear(),
			initialDate.getMonth(),
			initialDate.getDate(),
			initialDate.getHours(),
			initialDate.getMinutes(),
			initialDate.getSeconds()
		)
	);
};
/**
 * convertDateToUTC +5
 */
export const convertDateToUTC = (initialDate: Date) => {
	return new Date(
		initialDate.getUTCFullYear(),
		initialDate.getUTCMonth(),
		initialDate.getUTCDate(),
		initialDate.getUTCHours(),
		initialDate.getUTCMinutes(),
		initialDate.getUTCSeconds()
	);
};
/**
 * addCeroNumber
 * @param number
 * @returns string
 */
const addCeroNumber = (number: number): string => {
	return number <= 9 ? `0${number}` : `${number}`;
};
