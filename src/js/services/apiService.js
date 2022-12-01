import axios from 'axios';
import config from '../config/apiConfig';

class Api {
	constructor(url) {
		this.url = url;
	}

	async countries() {
		try {
			const response = await axios.get(`${this.url}/countries`);
			return response.data;
		} catch (error) {
			console.log('Error', error);
			return Promise.reject(error);
		}
	};

	async cities() {
		try {
			const response = await axios.get(`${this.url}/cities`);
			return response.data;
		} catch (error) {
			console.log('Error', error);
			return Promise.reject(error);
		}
	};

	async airlines() {
		try {
			const response = await axios.get(`${this.url}/airlines`);
			return response.data;
		} catch (error) {
			console.log('Error', error);
			return Promise.reject(error);
		}
	};

	async prices(params) {
		try {
			const response = await axios.get(`${this.url}/prices/cheap`, {
				params,
			});
			return response.data;
		} catch (error) {
			console.log('Error', error);
			return Promise.reject(error);
		}
	};
}

const api = new Api(config.url);

export default api;