import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init select
const  select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(el) {
	return M.FormSelect.getInstance(el);
}

// Init autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
	data: {
		"Apple": null,
		"Microsoft": null,
		"Google": 'https://placehold.it/250x250'
	},
});

export function getAutocompleteInstance(el) {
	return M.Autocomplete.getInstance(el)
}

//Init datepicker
const datepickers = document.querySelectorAll('.datepicker')
M.Datepicker.init(datepickers, {
	showClearBtn: true,
	format: 'yyyy-mm-dd',
});

export function getDatepickerInstance(el) {
	return M.Datepicker.getInstance(el);
}