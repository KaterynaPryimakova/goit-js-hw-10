import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

let slimSelect;

select.addEventListener('change', onChange);

const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';
const ENDPOINT2 = 'images/search';

function fetchBreeds() {
  const option = {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD',
    },
  };

  return fetch(`${BASE_URL}${ENDPOINT}`, option).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

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

    slimSelect = new SlimSelect({ select: '#single' });

    loader.hidden = true;
  })
  .catch(error => {
    loader.hidden = true;
    errorText.hidden = false;
    console.log(error);
  });

function onChange() {
  breedId = select.value;
  loader.hidden = false;
  errorText.hidden = true;
  catContainer.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(resp => {
      const { description, name, temperament } = resp[0].breeds[0];
      catContainer.insertAdjacentHTML(
        'beforeend',
        createMarkup(resp, description, name, temperament)
      );

      loader.hidden = true;
    })
    .catch(error => {
      loader.hidden = true;
      errorText.hidden = false;
      console.log(error);
    });
}
function fetchCatByBreed(breedId) {
  const option = {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD',
    },
  };
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}${ENDPOINT2}?${params}`, option).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
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
