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
    this.searchCards();
  }

  componentDidUpdate({ location }) {
    const oldQuery = qs.parse(location.search);
    if(oldQuery.name !== this.query.name || oldQuery.set !== this.query.set) {
      this.searchCards();
      console.log(this.query);
    }
    //TODO: reset page to 1
  }

  get query() {
    const { location } = this.props;
    const query = qs.parse(location.search);
    return query;
  }

  searchCards = () => {
    console.log('searching...');
    const { page, pageSize } = this.state;
    const query = this.query;
    search(query, { page, pageSize })
      .then(([results, totalCount]) => {
        const cards = results.cards;
        this.setState({ cards, totalCount, query });
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