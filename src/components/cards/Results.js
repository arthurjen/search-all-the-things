import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paging from '../paging/Paging.js';
import Cards from './Cards.js';
import qs from 'query-string';
import { search } from '../../services/mtgApi.js';




class Results extends Component {

  state = {
    sets: [],
    query: '',
    cards: '',
    page: 1,
    pageSize: 10,
    totalCount: 0
  };

  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.setState({ query: this.query }, () => this.searchCards());
    
  }

  componentDidUpdate({ location }) {
    const oldQuery = qs.parse(location.search);
    if(oldQuery === this.query) return;
    this.searchCards();
  }

  get query() {
    const { location } = this.props;
    const query = qs.parse(location.search);
    return query;
  }

  saveNewQuery = (query) => {
    const page = 1;
    this.setState({ query, page }, () => {
      this.handleSearch();
    });
  };

  searchCards = () => {
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

    const { cards, page, pageSize, totalCount } = this.state;

    return (
      <section>
        {cards &&
          <section  id="display">
            <Cards cards={cards}/>
            <Paging page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={this.handlePageChange}/>
          </section>
        }
      </section>
    );
    
  }
}

export default Results;