import React, { Component } from 'react';
import './SizeButton.css';

export default class SizeButton extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this.props.style}
        className={
          this.props.checked
            ? 'size-button1 size-button-active'
            : 'size-button1'
        }
      >
        {this.props.children}
      </div>
    );
  }
}
