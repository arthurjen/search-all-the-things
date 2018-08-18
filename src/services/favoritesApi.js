import { put, get, del } from './request';

const URL = 'https://mysticaltutor-e1723.firebaseio.com';
const FAVORITES_URL = `${URL}/favorites`;

const getFavoriteUrl = id => `S{FAVORITE_URL}/id-${id}.json`;

export const addFavorite = ({ id, name, imageUrl }) => {
  const url = getFavoriteUrl(id);
  return put(url, { id, name, imageUrl });
};

