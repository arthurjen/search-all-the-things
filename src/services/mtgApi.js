const BASE_URL = 'https://api.magicthegathering.io/v1';
const CARDS_URL = `${BASE_URL}/cards`;
const SETS_URL = `${BASE_URL}/sets`;
const TYPES_URL = `${BASE_URL}/types`;

const throwJson = json => { throw json; };
const getCards = url => fetch(url)
  .then(r => {
    return r.ok ? Promise.all([r.json(), +r.headers.get('Total-Count')]) : r.json().then(throwJson);
  });

const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export function search({ name = '', set = '', page = 1, pageSize = 10 }) {
  const paging = `?page=${page}&pageSize=${pageSize}`;
  const nameQuery = `&name=${name}`;
  const setQuery = `&set=${set}`;


  return getCards(`${CARDS_URL}${paging}${nameQuery}${setQuery}`);
}

export function getSets() {
  return get(SETS_URL).then(r => r.sets);
}
export function getTypes() {
  return get(TYPES_URL).then(r => r.types);
}

export function getCard(id) {
  const url = `${CARDS_URL}/${id}`;
  return get(url).then(r => r.card);
}