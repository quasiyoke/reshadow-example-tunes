import React, { Component } from 'react';
import styled from 'reshadow';
import styles from './styles.css';

export default class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onChange(this.state.value);
  };

  render = () => styled(styles)(
    <form onSubmit={this.onSubmit}>
      <input
        type="text"
        value={this.state.value}
        onChange={this.onChange}
      />
      <button>Search</button>
    </form>
  );
}
