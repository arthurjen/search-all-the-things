import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paging from '../paging/Paging.js';
import Cards from './Cards.js';
import qs from 'query-string';
import { search } from '../../services/mtgApi.js';
import styles from './Results.css';



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
    const { name, set, page, pageSize, type, colors } = oldQuery;
    
    if(
      name !== this.query.name ||
      set !== this.query.set ||
      page !== this.query.page ||
      pageSize !== this.query.pageSize ||
      type !== this.query.type ||
      colors !== this.query.colors
    ) {
      console.log(this.query);
      this.searchCards();
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
    const { name, set, type, pageSize, colors } = this.state.query;
    const { history } = this.props;
    history.push({
      pathname: '/results',
      search: qs.stringify({ page, pageSize, name, set, type, colors })
    });
  };

  render() {

    const { cards, totalCount, query, loading, error } = this.state;

    return (
      <section className={styles.results}>
        {(loading || error) &&
          <section className="notifications">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </section>
        }
        {cards &&
          <section  id="display">
            <Cards cards={cards}/>
            <Paging
              page={+query.page}
              pageSize={+query.pageSize}
              totalCount={totalCount}
              onPageChange={this.handlePageChange}/>
          </section>
        }
      </section>
    );
    
  }
}

export default Results;