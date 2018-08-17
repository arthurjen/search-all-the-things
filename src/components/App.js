import React, { Component } from 'react';
import Search from './search/Search.js';
import Cards from './cards/Cards.js';
import Paging from './paging/Paging.js';
import styles from './App.css';
import { search, getSets } from '../services/mtgApi.js';

class App extends Component {
  state = {
    sets: [],
    query: '',
    cards: '',
    page: 1,
    pageSize: 10,
    totalCount: 0
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

  saveNewQuery = (query) => {
    const page = 1;
    this.setState({ query, page }, () => {
      this.handleSearch();
    });
  };

  handleSearch = () => {
    const { query, page, pageSize } = this.state;
    search(query, { page, pageSize })
      .then(([results, totalCount]) => {
        const cards = results.cards;
        this.setState({ cards, totalCount });
      });
  };
  

  handlePageChange = (page) => {
    this.setState({ page }, () => {
      this.handleSearch();
    });
  };

  render() {

    const { cards, page, pageSize, totalCount, sets } = this.state;

    return (
      <div className={styles.app}>
        <header>
          <h1>Mystical Tutor - Magic: the Gathering Card Search Engine</h1>
        </header>
        <main>
          <section>
            <Search onSearch={this.saveNewQuery} sets={sets} />
          </section>
          
          {cards &&
            <section id="display">
              <Cards cards={cards}/>
              <Paging page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={this.handlePageChange}/>
            </section>
          }
          
        </main>
      </div>
    );
  }
}

export default App;