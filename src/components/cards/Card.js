import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addFavorite } from '../../services/favoritesApi.js';
import { Link } from 'react-router-dom';

export default class Card extends Component {

  static propTypes = {
    card: PropTypes.object.isRequired,
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
        <Link to={`/detail/${card.id}`}>
          {imageUrl ?
            <img src={imageUrl} alt={`${name}(${setName})`}/>
            : <p>{name}<br/>({setName}) <br/>Image Not Available</p>
          }
        </Link>
      </li>
    );
  }
}