const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';
const ENDPOINT2 = 'images/search';

export function fetchBreeds() {
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

export function fetchCatByBreed(breedId) {
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
