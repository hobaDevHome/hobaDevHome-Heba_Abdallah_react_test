import React, { Component } from "react";
import "./ViewBagButton.css";

export default class ViewBagButton extends Component {
  render() {
    return (
      <div className="veiwbag-div" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
