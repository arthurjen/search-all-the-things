import React, { Component } from 'react';
import Search from './search/Search.js';
import styles from './App.css';
import { search } from '../services/mtgApi.js';

class App extends Component {
  state = {
    query: null
  };

  handleSearch = (query) => {
    search(query)
      .then(result => {
        console.log(result[0]);
      });
  };

  render() {
    return (
      <div className={styles.app}>
        <header>
          <h1>Mystical Tutor - Magic: the Gathering Card Search Engine</h1>
        </header>
        <main>
          <Search onSearch={this.handleSearch}/>
        </main>
      </div>
    );
  }
}

export default App;