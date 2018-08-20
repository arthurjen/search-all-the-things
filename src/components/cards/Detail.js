import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCard } from '../../services/mtgApi';
import { addFavorite, getFavorite, removeFavorite } from '../../services/favoritesApi';
import style from './Detail.css';

class Detail extends Component {
  state = {
    card: null,
    favorite: null
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getCard(id)
      .then(card => {
        this.setState({ card });
      })
      .catch(console.log);
    
    getFavorite(id)
      .then(favorite => {
        this.setState({ favorite });
      })
      .catch(console.log);
  }

  handleClick = () => {
    const { card, favorite } = this.state;
    const isFavorite = !!favorite;

    if(isFavorite) {
      removeFavorite(card.id)
        .then(() => {
          this.setState({ favorite: null });
        })
        .catch(console.log);
    }
    else {
      addFavorite(this.state.card)
        .then(favorite => {
          this.setState({ favorite });
        })
        .catch(console.log);
    }
  };

  render() {
    const { card, favorite } = this.state;
    if(!card) return null;
    const { name, imageUrl, manaCost, colors, type, rarity, setName, text } = card;
    return (
      <div className={style.detail} id="detail-view">
        <section id="detail-image">
          <img src={imageUrl}/>
        </section>
        <section id="detail-text">
          <h2>Name: {name}</h2>
          <h3>Mana Cost: {manaCost}</h3>
          <h4>Colors: {colors}</h4>
          <h4>Type: {type}</h4>
          <h4>Rarity: {rarity}</h4>
          <h4>Set: {setName}</h4>
          <p>Text: {text}</p>
          
        </section>
        <span>Favorite:
          <button onClick={this.handleClick}>
            {favorite ? '❌' : '❤️' }
          </button>
        </span>
      </div>

    );
  }
}

export default Detail;