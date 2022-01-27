import React, { Component } from 'react';
import './OverlayAddRemove.css';

export default class AddRemove extends Component {
  render() {
    return (
      <div className="addremove-div" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
