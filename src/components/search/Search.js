import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import style from './Search.css';
import './Search.css';
import { getSets } from '../../services/mtgApi.js';


export default class Search extends Component {
  state = {
    name: '',
    sets: [],
    type: '',
    set: '',
    colors: [],
    logic: '',
    colorsControl: ['White', 'Blue', 'Black', 'Red', 'Green']
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

  handleLogic = ({ target }) => {
    this.setState({ logic: target.value });
  };

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
    const { name, set, type, colors, logic } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: qs.stringify({ page: 1, pageSize: 18, name, set, type, colors: colors.join(logic === 'or' ? '|' : ',') })
    });
  };

  resetForm = event => event.preventDefault();

  render() {
    const { name, sets, type, colorsControl } = this.state;

    return (
      <form className={style.search} onSubmit={event => this.handleSubmit(event)}>
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
            {colorsControl.map(color => (
              <li  key={color}>
                <input type="checkbox" id={color} name="colors" value={color} onChange={this.handleCheck}/>
                <label htmlFor={color}>{color}</label>
              </li>
            ))}
          </ul>

          <ul>
            <li>
              <input type="radio" name="logic" id="or" value="or" onChange={this.handleLogic}/>
              <label htmlFor="or">Or</label>
            </li>
            <li>
              <input type="radio" name="logic" id="and" value="and" onChange={this.handleLogic}/>
              <label htmlFor="and">And</label>
            </li>
          </ul>
        </div>
        <input type="reset"/>
        <button>Search</button>
      </form>
    );
  }
}
