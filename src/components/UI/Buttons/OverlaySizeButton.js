import React, { Component } from "react";
import "./OverlaySizeButton.css";

export default class SizeButton extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this.props.style}
        className={
          this.props.checked ? "size-button size-button-active" : "size-button"
        }
      >
        {this.props.children}
      </div>
    );
  }
}
