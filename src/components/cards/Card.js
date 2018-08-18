import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addFavorite } from '../../services/favoritesApi.js';

export default class Card extends Component {

  static propTypes = {
    card: PropTypes.object.isRequired
  };

  handleClick = () => {
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