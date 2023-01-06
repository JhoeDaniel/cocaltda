import { _page } from './index.data';
import { Page } from './index.type';

export const validation = (url: string) => {
	return new Promise<Page | any>(async (resolve, reject) => {
		/**
		 * Execute the url depending on the path
		 */
		if (url == '/getPageData') {
			resolve(_page);
		}
	});
};
