import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCard } from '../../services/mtgApi';
import { addFavorite, getFavorite, removeFavorite } from '../../services/favoritesApi';


class Detail extends Component {
  state = {
    card: null,
    favorite: null
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  }

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
        .catch(console.log)
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
    const { name, imageUrl, manaCost } = card;
    return (
      <div>
        <h2>{name}</h2>
        <h3>{manaCost}</h3>
        <img src={imageUrl}/>
        <button onClick={this.handleClick}>
          {favorite ? '❌' : '⭐️' }
        </button>
      </div>

    );
  }
}

export default Detail;