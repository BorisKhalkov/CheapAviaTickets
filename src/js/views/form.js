import { getAutocompleteInstance, getDatepickerInstance } from '../plugins/materialize';

class FormUI {
	#form;
	constructor(autocompleteInstance, datePickerInstance) {
		this.#form = document.forms['location-controls'];
		this.origin = document.querySelector('#autocomplete-origin');
		this.destination = document.querySelector('#autocomplete-destination');
		this.depart = document.querySelector('#datepicker-depart');
		this.return = document.querySelector('#datepicker-return');
		this.originAutocomplete = autocompleteInstance(this.origin);
		this.destinationAutocomplete = autocompleteInstance(this.destination);
		this.departDatePicker = datePickerInstance(this.depart);
		this.returnDatePicker = datePickerInstance(this.return);
	}

	get from() {

		return this.#form;
	}

	get originValue() {

		return this.origin.value;
	}

	get destinationValue() {

		return this.destination.value;
	}

	get departDateValue() {

		return this.departDatePicker.toString();
	}

	get returnDateValue() {

		return this.returnDatePicker.toString();
	}

	setAutocompleteData(date) {
		this.originAutocomplete.updateData(date);
		this.destinationAutocomplete.updateData(date);
	}
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;