import React, { Component } from 'react';

export default class ItemAddForm extends Component {
  state = {
    label: ''
  };

  onLabelChange = e => {
    this.setState({ label: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { label } = this.state;
    this.setState({ label: '' });
    this.props.onItemAdded(label);
    // const cb = this.props.onItemAdded || (() => {});
    // cb(label);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="d-flex">
        <input
          type="text"
          className="form-control form-control-lg"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
        />

        <button type="submit" className="btn btn-lg btn-outline-secondary">
          Add
        </button>
      </form>
    );
  }
}
