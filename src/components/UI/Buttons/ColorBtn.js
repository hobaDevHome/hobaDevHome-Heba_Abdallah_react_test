import React, { Component } from 'react';
import './ColorBtn.css';

export default class ColorBtn extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this.props.style}
        className={
          this.props.checked
            ? 'color-button color-button-active'
            : 'color-button'
        }
      >
        {this.props.children}
      </div>
    );
  }
}
