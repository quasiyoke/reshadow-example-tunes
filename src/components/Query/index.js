import React, { Component } from 'react';
import styled from 'reshadow';
import styles from './styles.css';

export default class Query extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value,
    };
  }

  onChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onChange(this.state.value);
  };

  render() {
    const { value } = this.state;
    return styled(styles)(
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={value}
          onChange={this.onChange}
        />
        <button>Search</button>
      </form>
    );
  }
}
