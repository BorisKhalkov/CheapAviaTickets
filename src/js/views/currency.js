class CurrencyUI {
	constructor() {
		this.currency = document.querySelector('#currency');
		this.dic = {
			USD: '$',
			EUR: '€',
			RUB: '₽‎',
		}
	}

	get currencyValue() {

		return this.currency.value;
	}

	getCurrencySymbol() {

		return this.dic[this.currencyValue];
	}

}

const currencyUI = new CurrencyUI();

export default currencyUI;