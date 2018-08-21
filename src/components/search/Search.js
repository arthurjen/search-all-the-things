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
    type: '',
    set: '',
    colors: [],
    or: true
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

  handleCheck = ({ target }) => {
    const { value } = target;
    const { colors } = this.state;
    if(colors.includes(value)) this.setState(({ colors }) => ({ colors: colors.filter(c => c !== value) }));
    else this.setState(({ colors }) => ({
      colors: [...colors, value]
    }));

  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, set, type, colors } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: qs.stringify({ page: 1, pageSize: 18, name, set, type, colors: colors.join(',') })
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
        <div>
          <legend>Colors:</legend>
          
          <ul>
            <li>
              <input type="checkbox" id="white" name="colors" value="white" onChange={this.handleCheck}/>
              <label htmlFor="white">White</label>
            </li>
            <li>
              <input type="checkbox" id="blue" name="colors" value="blue" onChange={this.handleCheck}/>
              <label htmlFor="blue">Blue</label>
            </li>
            <li>
              <input type="checkbox" id="black" name="colors" value="black" onChange={this.handleCheck}/>
              <label htmlFor="black">Black</label>
            </li>
            <li>
              <input type="checkbox" id="red" name="colors" value="red" onChange={this.handleCheck}/>
              <label htmlFor="red">Red</label>
            </li>
            <li>
              <input type="checkbox" id="green" name="colors" value="green" onChange={this.handleCheck}/>
              <label htmlFor="green">Green</label>
            </li>
          </ul>
        </div>
        <button>Search</button>
      </form>
    );
  }
}