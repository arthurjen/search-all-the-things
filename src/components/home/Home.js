import React, { Component } from 'react';
import styles from './Home.css';

class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <h1>MYSTICAL TUTOR</h1>
        <h2>A Magic: The Gathering Card Search Engine</h2>
      </div>

    );
  }
}

export default Home;