import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';
export default class Cards extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(Object)
  };

  render() {
    const { cards } = this.props;

    return (
      <ul>
        {cards.map((card, i) => (
          <Card key={i} card={card}/>
        ))}
      </ul>
    );
    
  }
}