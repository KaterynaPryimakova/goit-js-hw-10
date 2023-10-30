import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
// console.dir(select);

// select.addEventListener('click', onSelect);

function fetchBreeds() {
  const option = {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD',
    },
  };

  return fetch(`${BASE_URL}${ENDPOINT}`, option)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(rest.statusText);
      }

      return resp.json();
    })
    .then(breeds => {
      select.innerHTML = '';

      breeds.forEach(breed => {
        const selectOption = document.createElement('option');
        selectOption.value = breed.id;
        selectOption.textContent = breed.name;
        select.appendChild(selectOption);
      });
    })
    .catch(error => console.error(error));
}
fetchBreeds();
