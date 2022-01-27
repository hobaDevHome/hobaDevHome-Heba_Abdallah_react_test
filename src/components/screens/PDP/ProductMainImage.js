import React, { Component } from 'react';
import './ProductMainImage.css';

export default class ProdcutMainImage extends Component {
  render() {
    return (
      <div
        className={
          !this.props.inStock
            ? 'mainImage-container out-of-stock'
            : 'mainImage-container'
        }
      >
        <img
          className="product-mainImage out-of-stock"
          src={this.props.mainImage}
          alt=""
        />
        <div className="out-lable">
          <p>OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}
