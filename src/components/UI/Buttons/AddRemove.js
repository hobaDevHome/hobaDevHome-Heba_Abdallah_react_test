import React, { Component } from "react";
import "./AddRemove.css";

export default class AddRemove extends Component {
  render() {
    return (
      <div className="addremove-div2" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
