import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Paging.css';

export default class Paging extends Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
  };

  handleClick = (n) => {
    const newPage = this.props.page + n;
    this.props.onPageChange(newPage);
  };

  render() {
    const { page, pageSize, totalCount } = this.props;

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <section id="paging" className={styles.paging}>
        <button disabled={page === 1}onClick={() => this.handleClick(-1)}>^</button>
        <span>{page} of {totalPages}</span>
        <button onClick={() => this.handleClick(1)}>v</button>
      </section>
    );
  }
}