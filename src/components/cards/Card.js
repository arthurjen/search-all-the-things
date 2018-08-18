import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addFavorite, removeFavorite } from '../../services/favoritesApi.js';

export default class Card extends Component {

  static propTypes = {
    card: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool
  };

  handleClick = () => {
    const { favorite } = this.state;
    const isFavorite = !!favorite;

    addFavorite(this.props.card)
      .catch(console.log);
  };


  render() {
    const { card } = this.props;
    const { imageUrl, name, setName } = card;

    return (
      <li>
        <img src={imageUrl} alt={`${name}(${setName})`}/>
        <button onClick={this.handleClick}>⭐️</button>
      </li>
    );
  }
}