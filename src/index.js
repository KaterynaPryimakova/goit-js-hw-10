import axios from 'axios';
import { fetchBreeds } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_yDc4ASp436VjqLpwC5rFwnSPrZ2043WhB43zAEXjdoh2GdulyIea4exNRs8VBGgD';

fetchBreeds();
