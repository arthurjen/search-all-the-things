import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.css';

class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <div>
          <i className="far fa-moon"></i>
          <Link to="/"><h1>Mystical Tutor</h1></Link>
        </div>
        <nav>
          <ul id="nav-bar">
            <li>
              <Link to="/results?page=1&pageSize=18">Search</Link>
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