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
    totalCount: 0,
    loading: false,
    error: null
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.searchCards();
  }

  componentDidUpdate({ location }) {
    const oldQuery = qs.parse(location.search);
    if(oldQuery.name !== this.query.name || oldQuery.set !== this.query.set || oldQuery.page !== this.query.page || oldQuery.pageSize !== this.query.pageSize) {
      this.setState({ page: 1 }, () => this.searchCards());
      console.log(this.query);
    }
  }

  get query() {
    const { location } = this.props;
    const query = qs.parse(location.search);
    return query;
  }

  searchCards = () => {
    this.setState({
      loading: true,
      error: null
    });

    const query = this.query;
    console.log('QUERY:', query);
    search(query)
      .then(([results, totalCount]) => {
        const cards = results.cards;
        this.setState({ cards, totalCount, query });
      },
      err => {
        this.setState({ error: err.message });
      }
      )
      .then(() => {
        this.setState({ loading: false });
      });
  };
  

  handlePageChange = (page) => {
    const { name, set, pageSize } = this.state.query;
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: qs.stringify({ page, pageSize, name, set })
    });
  };

  render() {

    const { cards, totalCount, query, loading, error } = this.state;

    return (
      <section>
        {(loading || error) &&
          <section className="notifications">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </section>
        }
        {cards &&
          <section  id="display">
            <Cards cards={cards}/>
            <Paging page={+query.page} pageSize={+query.pageSize} totalCount={totalCount} onPageChange={this.handlePageChange}/>
          </section>
        }
      </section>
    );
    
  }
}

export default Results;