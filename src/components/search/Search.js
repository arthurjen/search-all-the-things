import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

export default class Search extends Component {
  state = {
    name: '',
    set: ''
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    sets: PropTypes.arrayOf(Object).isRequired
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state);
  };

  render() {
    const { name } = this.state;
    const { sets } = this.props;

    return (
      <form className="search-form" onSubmit={event => this.handleSubmit(event)}>
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