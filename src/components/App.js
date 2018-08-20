import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Detail from './cards/Detail.js';
import Results from './cards/Results.js';
import Favorites from './favorites/Favorites.js';
import Header from './Header.js';
import Home from './home/Home.js';
import Search from './search/Search.js';
import styles from './App.css';

class App extends Component {


  

  render() {


    return (
      <Router>
        <div className={styles.app}>
          <Header onSearch={this.handleSearch}/>
          <main>
            <section>
              <Route component={Search}/>
            </section>    
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