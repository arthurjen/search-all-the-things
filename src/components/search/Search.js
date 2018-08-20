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
    types: '',
    set: ''
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
   
    getSets().then(_sets => {
      const sets = _sets.map(set => {
        return {
          code: set.code,
          name: set.name
        };
      }).sort();
      this.setState({ sets });
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, set, type } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: qs.stringify({ page: 1, pageSize: 18, name, set, type })
    });
  };

  render() {
    const { name, sets, type } = this.state;

    return (
      <form className={styles.search} onSubmit={event => this.handleSubmit(event)}>
        <label>
          Name:&nbsp;
          <input name="name" value={name} onChange={this.handleChange}/>
        </label>
        <label>
          Set:&nbsp;
          <select name="set" onChange={event => this.handleChange(event)}>
            <option value=""></option>
            {sets.map(set => (
              <option key={set.code} value={set.code}>{set.name}</option>
            ))}
          </select>
        </label>
        <label>
          Type:&nbsp;
          <input name="type" value={type} onChange={this.handleChange}/>
        </label>
        <button>Search</button>
      </form>
    );
  }
}