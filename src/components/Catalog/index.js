import React, { Component } from 'react';
import Query from '../Query';

const INITIAL_QUERY = 'moby';

export default class Catalog extends Component {
  constructor() {
    super();
    this.state = { query: INITIAL_QUERY };
    this.fetch(INITIAL_QUERY);
  }

  setQuery = (query) => {
    if (query !== this.state.fetchedQuery)
      this.fetch(query);
    }

    this.setState({
      query,
    });
  };

  onFetchError = (response) => {
    this.setState({
      ...this.state,
      fetchedQuery: this.state.query,
    })
    console.error(response);
  };

  onFetchSuccess = (response) => {
    console.log(response);
  };

  fetch(query) {
    const param = encodeURIComponent(query);
    fetch(`https://itunes.apple.com/search?term=${param}&limit=25`)
      .then(response => response.json())
      .then(this.onFetchSuccess)
      .catch(this.onFetchError);
  }

  render() {
    const { query } = this.state;
    return (
      <Query
        value={query}
        onChange={this.setQuery}
      />
    );
  }
}
