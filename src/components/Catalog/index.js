import React, { Component } from 'react';
import styled from 'reshadow';
import fetchJsonp from 'fetch-jsonp';
import Tunes from '../Tunes';
import Query from '../Query';
import styles from './styles.css';

const INITIAL_QUERY = 'shadow';

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined, // Fetched data (we have nothing now)
      query: INITIAL_QUERY, // Current search query
    };
    this.fetch(INITIAL_QUERY);
  }

  setQuery = (query) => {
    this.setState({
      items: undefined, // We have no data for a fresh query.
      query,
    });
    this.fetch(query);
  };

  onFetchError(query, err) {
    console.error(`Fetch Error for Query "${query}":`, err);
    if (query !== this.state.query) {
      // We've received an error for a previous (outdated) query.
      return; // Do nothing.
    }
    this.setState({
      items: null, // `null` acts as an error flag.
      query,
    });
  }

  onFetchSuccess(query, items) {
    console.log(`Fetch Success for Query "${query}":`, items);
    if (query !== this.state.query) {
      // We've received a response for a previous (outdated) query.
      return; // Do nothing.
    }
    this.setState({
      items,
      query,
    });
  }

  fetch(query) {
    const encodedQuery = encodeURIComponent(query);
    fetchJsonp(`https://itunes.apple.com/search?term=${encodedQuery}&limit=24`)
      .then(response => response.json())
      .then(obj => obj.results)
      .then(
        this.onFetchSuccess.bind(this, query),
        this.onFetchError.bind(this, query),
      );
  }

  render = () => styled(styles)(
    <>
      <Query
        value={this.state.query}
        onChange={this.setQuery}
      />
      <tunes>
        <Tunes tunes={this.state.items} />
      </tunes>
    </>
  );
}
