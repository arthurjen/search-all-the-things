import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.css';

class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <i className="far fa-moon"></i>
        <h1>Mystical Tutor</h1>
        <nav>
          <ul id="nav-bar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/results">Search</Link>
            </li> 
            <li>
              <Link to="/favorites">Favorites</Link>
            </li> 
          </ul>
        </nav>  
      </header>
    );

  }
    
}
export default Header;