import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import styles from './Search.css';
import './Search.css';
import { getSets } from '../../services/mtgApi.js';


export default class Search extends Component {
  state = {
    name: '',
    sets: [],
    set: ''
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { location } = this.props;
    const { name = '' } = qs.parse(location.name);
    const { match, history } = this.props;
    console.log('match', match);
    console.log('location', location);

    getSets().then(_sets => {
      const sets = _sets.map(set => {
        return {
          code: set.code,
          name: set.name
        };
      }).sort();
      this.setState({ sets, name });
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { name, sets } = this.state;

    return (
      <form className={styles.cards} onSubmit={event => this.handleSubmit(event)}>
        <label>
          Name:
          <input name="name" value={name} onChange={this.handleChange}/>
        </label>
        <label>
          Set:
          <select name="set" onChange={event => this.handleChange(event)}>
            <option value=""></option>
            {sets.map(set => (
              <option key={set.code} value={set.code}>{set.name}</option>
            ))}
          </select>
        </label>
        <button>Search</button>
      </form>
    );
  }
}