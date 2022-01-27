import React, { Component } from "react";
import "./ProdcutDetailsImage.css";

export default class ProdcutDetailsImage extends Component {
  render() {
    return (
      <div className="thumb-container" onClick={this.props.onClick}>
        <img className="product-thumb" src={this.props.thumbSrc} alt="" />
      </div>
    );
  }
}
