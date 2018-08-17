import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paging from '../paging/Paging.js';
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

  get query() {
    const { location } = this.props;
    const { search } = qs.parse(location.search);
    return search;
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

    return (
      <section>
        <h2>RESULTS</h2>
      </section>
    );
    
  }
}

export default Results;