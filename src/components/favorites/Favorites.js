import React, { Component } from 'react';
import { getFavorites } from '../../services/favoritesApi';
import Card from '../cards/Card';
import style from './Favorites.css';
require('dotenv').config();
const API_KEY = process.env.API_KEY;
import firebase from 'firebase';
const config = {
  apiKey: API_KEY,
  authDomain: 'mysticaltutor-e1723.firebaseapp.com',
  databaseURL: 'https://mysticaltutor-e1723.firebaseio.com',
  projectId: 'mysticaltutor-e1723',
  storageBucket: 'mysticaltutor-e1723.appspot.com',
  messagingSenderId: '42370156112'
};
firebase.initializeApp(config);
const database = firebase.database();

class Favorites extends Component {
  
  state = {
    favorites: null
  };

  

  componentDidMount() {

    const favoritesRef = database.ref('favorites');
    
    favoritesRef.on('value', (snapshot) => {
      const response = snapshot.val();
      const favorites = Object.keys(response)
        .map(key => response[key]);
      this.setState({ favorites });
    });
  }

  render() {
    const { favorites } = this.state;
    if(!favorites) return null;
    return (
      <ul className={style.favorites}>
        {favorites.map((card, i) => (
          <Card key={i} card={card} isFavorite={true}/>
        ))}
      </ul>
    );
  }
}

export default Favorites;