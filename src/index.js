import axios from 'axios';
import './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catContainer = document.querySelector('.cat-info');

let slimSelect;

select.addEventListener('change', onChange);

fetchBreeds()
  .then(breeds => {
    select.hidden = false;
    select.innerHTML = '';

    breeds.forEach(breed => {
      const selectOption = document.createElement('option');
      selectOption.value = breed.id;
      selectOption.textContent = breed.name;
      select.appendChild(selectOption);
    });

    slimSelect = new SlimSelect({
      select: '#single',
      settings: {
        showSearch: true,
        searchText: 'Sorry nothing to see here',
        searchPlaceholder: 'Search for the cat breed!',
        searchHighlight: true,
      },
    });
    loader.style.display = 'none';
  })
  .catch(error => {
    loader.style.display = 'none';
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      position: 'center-top',
      width: '100%',
      useIcon: false,
    });
    console.log(error);
  });

function onChange() {
  const breedId = select.value;
  loader.style.display = 'inline-block';
  catContainer.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(resp => {
      const { description, name, temperament } = resp[0].breeds[0];
      catContainer.insertAdjacentHTML(
        'beforeend',
        createMarkup(resp, description, name, temperament)
      );

      loader.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
        width: '100%',
        useIcon: false,
      });
      console.log(error);
    });
}

function createMarkup(arr, description, name, temperament) {
  return arr
    .map(({ url }) => {
      return `<img src="${url}" alt="${name}" width="550" />
    <div>
        <h2>${name}</h2>
        <p class='descript'>${description}</p>
        <h3>Temperament:</h3>
        <p>${temperament}</p>
    </div>`;
    })
    .join('');
}
