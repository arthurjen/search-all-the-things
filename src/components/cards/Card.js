import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {

  static propTypes = {
    card: PropTypes.object.isRequired
  };

  render() {
    const { card } = this.props;
    const { imageUrl, name, setName } = card;

    return (
      <li>
        <img src={imageUrl} alt={`${name}(${setName})`}/>
      </li>
    );
  }
}