import api from '../services/apiService';
import { formatDate } from '../helpers/date';

class Locations {
	constructor(api, helpers) {
		this.api = api;
		this.countries = null;
		this.cities = null;
		this.shortCitiesList = null;
		this.airlines = {};
		this.formatDate = formatDate;
	}

	async init() {
		const response = await Promise.all([
			this.api.countries(),
			this.api.cities(),
			this.api.airlines(),
		]);

		const [countries, cities, airlines] = response;
		this.countries = this.serializeCountries(countries);
		this.cities = this.serializeCities(cities);
		this.shortCitiesList = this.createShortCitiesList(this.cities);
		this.airlines = this.serializeAirlines(airlines);

		return response;
	}

	getAirlineNameByCode(code) {

		return this.airlines[code] ? this.airlines[code].name : '';
	}

	getAirlineLogoByCode(code) {

		return this.airlines[code] ? this.airlines[code].logo : '';
	}

	getCityCodeByKey(key) {
		const city = Object.values(this.cities).find(city => city.fullName === key,);

		return city.code
	}

	getCityNameByCode(code) {

		return this.cities[code].name;
	}

	createShortCitiesList(cities) {
		// {'City, Country'}
		return Object.entries(cities).reduce((acc, [, city]) => {
			acc[city.fullName] = null;

			return acc;
		}, {})
	}

	serializeAirlines(airlines) {

		return airlines.reduce((acc, airline) => {
			airline.logo = `https://pics.avs.io/200/200/${airline.code}.png`;
			airline.name = airline.name ?? airline.name_translations.en;
			acc[airline.code] = airline;

			return acc;
		}, {})
	}

	serializeCountries(countries) {
		// {'Country code': {country data}}
		return countries.reduce((acc, country) => {
			acc[country.code] = country;

			return acc;
		}, {})
	}

	serializeCities(cities) {
		//{ 'City name, Country name': {city data}}
		return cities.reduce((acc, city) => {
			const countryName = this.getCountryNameByCode(city.country_code);
			city.name = city.name ?? city.name_translations.en;
			const fullName = `${city.name}, ${countryName}`;
			acc[city.code] = {
				...city,
				countryName,
				fullName,
			};

			return acc;
		}, {})
	}

	getCountryNameByCode(code) {

		return this.countries[code].name;
	}

	async fetchTickets(params) {
		const response = await this.api.prices(params);
		this.lastSearch = this.serializeTickets(response.data);
	}

	serializeTickets(tickets) {
		return Object.values(tickets).map(ticket => {

			return {
				...ticket,
				originName: this.getCityNameByCode(ticket.origin),
				destinationName: this.getCityNameByCode(ticket.destination),
				airlineLogo: this.getAirlineLogoByCode(ticket.airline),
				airlineName: this.getAirlineNameByCode(ticket.airline),
				departureAt: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
				returnAt: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
			}
		})
	}
}

const locations = new Locations(api, { formatDate });

export default locations;