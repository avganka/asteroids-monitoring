import axios from 'axios';

export function formatDistance(distance: string) {
	const str = parseInt(distance).toString().split('');
	let res = ''
	for (let i = str.length - 1; i >= 0; i--) {
		if (i % 3 === 0) {
			res = str[i] + ' ' + res
		} else {
			res = str[i] + res;
		}
	}
	return res;
}

export async function getData<T>(url: string): Promise<T | undefined> {
	try {
		const {data} = await axios<T>(url);
		return data;
	} catch (error) {
		// TODO handle error
		console.log(error)
	}
}