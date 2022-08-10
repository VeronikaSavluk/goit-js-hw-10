import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("input#search-box");
const listOfCountries = document.querySelector(".country-list");
listOfCountries.style.listStyle = "none";

inputEl.addEventListener("input", debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    e.preventDefault();
    let name = e.target.value.trim();

    fetchCountries(name)
        .then(renderCountryList)
        .catch(error => {
            if (name !== "") {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                listOfCountries.innerHTML = "";
            }
});
}

function renderCountryList(name) {
if (name.length > 9) {
    listOfCountries.innerHTML = "";
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
} else
    if (name.length > 1) {
        listOfCountries.innerHTML = "";
        const newCountries = name.map((country) => {
            return `<li><div style="display:flex; align-items:center">
            <img src="${country.flags.svg}" alt = "flag" width="20px" height="14x">
            <p style="margin:0px; margin-left:5px">${country.name.official}</p></div></li>`;
    }).join(" ");
        listOfCountries.innerHTML = newCountries;
} else
    if (name.length = 1) {
        listOfCountries.innerHTML = "";
        const newCountry = name.map((country) => {
            return `<li style="margin:0px"><div style="display:flex; align-items:center">
            <img src="${country.flags.svg}" alt = "flag" width="20px" height="14px">
            <b style="margin-left:10px; font-size:32px">${country.name.official}</b></div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b style="text-transform:capitalize">languages:</b> ${Object.values(country.languages)}</p></li>`;
    }).join(" ");
        listOfCountries.innerHTML = newCountry;
};
}