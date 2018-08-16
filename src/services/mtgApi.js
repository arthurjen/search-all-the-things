const BASE_URL = 'https://api.magicthegathering.io/v1';
const CARDS_URL = `${BASE_URL}/cards`;
const SETS_URL = `${BASE_URL}/sets`;
const TYPES_URL = `${BASE_URL}/types`;

const throwJson = json => { throw json; };
const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export function search({ name = '', set = '' }, { page = 1, pageSize = 5 } = {}) {
  const paging = `?page=${page}&pageSize=${pageSize}`;
  const nameQuery = `&name=${name}`;
  const setQuery = `&set=${set}`;


  return get(`${CARDS_URL}${paging}${nameQuery}${setQuery}`).then(r => r.cards);
}

export function getSets() {
  return get(SETS_URL).then(r => r.sets);
}
export function getTypes() {
  return get(TYPES_URL).then(r => r.types);
}