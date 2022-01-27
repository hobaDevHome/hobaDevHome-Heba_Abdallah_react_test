import React, { Component } from "react";
import "./WideButton.css";

export default class WideButton extends Component {
  render() {
    return (
      <div
        className="wide-button"
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
