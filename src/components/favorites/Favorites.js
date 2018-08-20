import React, { Component } from 'react';
import { getFavorites } from '../../services/favoritesApi';
import Card from '../cards/Card';

class Favorites extends Component {

  state = {
    favorites: null
  };

  componentDidMount() {
    getFavorites()
      .then(favorites => {
        this.setState({ favorites });
      })
      .catch(console.log);
  }

  render() {
    const { favorites } = this.state;
    if(!favorites) return null;
    return (
      <ul>
        {favorites.map((card, i) => (
          <Card key={i} card={card} isFavorite={true}/>
        ))}
      </ul>
    );
  }
}

export default Favorites;