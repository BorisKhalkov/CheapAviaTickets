import { format } from 'date-fns';


/**
 *
 * @param {String} str - дата билета
 * @param {String} type - возвращаемый формат даты 'mm/dd/yyyy'
 * @returns
 */
export function formatDate(str, type) {
	const date = new Date(str);

	return format(date, type);
}
