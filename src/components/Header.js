import React, { Component } from 'react';
import Search from './search/Search';
import { Link, Route } from 'react-router-dom';
// import style from './Header.css';

class Header extends Component {

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/results">Search</Link>
            </li> 
          </ul>
        </nav>  
        <section>
          <Route component={Search}/>
        </section>    
      </div>
    );

  }
    
}
export default Header;