import React, { Component } from 'react';
import Search from './search/Search.js';
import Cards from './cards/Cards.js';
import styles from './App.css';
import { search } from '../services/mtgApi.js';

class App extends Component {
  state = {
    query: null,
    cards: null,
  };

  handleSearch = (query) => {
    search(query)
      .then(results => {
        this.setState({
          cards: results
        });
      });
  };

  render() {

    const { cards } = this.state;

    return (
      <div className={styles.app}>
        <header>
          <h1>Mystical Tutor - Magic: the Gathering Card Search Engine</h1>
        </header>
        <main>
          <section>
            <Search onSearch={this.handleSearch}/>
          </section>
          <section>
            {cards && <Cards cards={cards}/>}
          </section>
        </main>
      </div>
    );
  }
}

export default App;