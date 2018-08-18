import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Detail from './cards/Detail.js';
import Results from './cards/Results.js';
import Favorites from './favorites/Favorites.js';
import Header from './Header.js';
import Home from './home/Home.js';
import styles from './App.css';
import { search, getSets } from '../services/mtgApi.js';

class App extends Component {


  

  render() {


    return (
      <Router>
        <div className={styles.app}>
          <header>
            <h1>Mystical Tutor - Magic: the Gathering Card Search Engine</h1>
          </header>
          <main>
            <Header onSearch={this.handleSearch}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/results" component={Results}/>
              <Route exact path="/favorites" component={Favorites}/>
              <Route path="/detail/:id" component={Detail}/>
              <Redirect to="/"/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;