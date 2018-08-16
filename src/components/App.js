import React, { Component } from 'react';
import Search from './search/Search.js';
import styles from './App.css';

class App extends Component {
  state = {
    query: null
  };

  handleSearch = (query) => {
    console.log(query);
  };

  render() {
    return (
      <div className={styles.app}>
        <header>
          <h1>Mystical Tutor</h1>
        </header>
        <main>
          <Search onSearch={this.handleSearch}/>
        </main>
      </div>
    );
  }
}

export default App;