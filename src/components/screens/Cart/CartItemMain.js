import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addCartItem } from '../../../store/actions';
import {
  deleteCartItem,
  addCartItemFromCart,
  deleteCartItemFromCart,
} from '../../../store/actions';

import CartItemCarousel from './CartItemCarousel/CartItemCarousel';
import AddRemove from '../../UI/Buttons/AddRemove';
import { generateKey } from '../../../GenerateKey';
import './Cart.css';

class CartItemMain extends Component {
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.itemAttributes = undefined;
    this.itemPrice = undefined;
    this.correspondingProduct = undefined;
  }
  onAddItem() {
    this.props.addCartItemFromCart(this.props.cartItem);
  }
  onDeleteItem() {
    this.props.deleteCartItemFromCart(this.props.cartItem);
  }

  render() {
    if (this.props.cartItems !== undefined) {
      this.itemPrice = this.props.cartItem.productPrice.find(
        (price) => price.currency.symbol === this.props.currency
      ).amount;

      if (this.props.productsList.products !== undefined) {
        this.correspondingProduct = this.props.productsList.products.find(
          (prod) => prod.id === this.props.cartItem.id
        );
      }
      this.itemAttributes = this.props.cartItem.itemAttr;
    }

    return (
      <div className="main-cart-item">
        <div className="cart-item-data">
          <div className="cart-item-title">
            {this.props.cartItem.productTitle}
          </div>

          <div className="price-amount">{`${this.props.currency} ${this.itemPrice}`}</div>

          <div className="attr-buttons-cont">
            {this.itemAttributes !== undefined &&
              this.itemAttributes.map((attr) => {
                if (attr.name === 'Color') {
                  return (
                    <div
                      className="att-button-cart"
                      key={generateKey(attr.attribute.value)}
                    >
                      <div className="attr-name-cart">{attr.name} : </div>
                      <div
                        className="color-btn-in-item1"
                        style={{
                          backgroundColor: attr.attribute.value,
                        }}
                      ></div>
                    </div>
                  );
                } else {
                  return (
                    <div className="att-button-cart">
                      <div className="attr-name-cart">{attr.name} : </div>
                      <div className="size-btn-in-item">
                        {attr.attribute.value}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="cart-item-images-quantity">
          <div className="quantity-div">
            <AddRemove onClick={this.onAddItem}>+</AddRemove>
            <div className="quantity">{this.props.cartItem.quantity}</div>
            <AddRemove onClick={this.onDeleteItem}>-</AddRemove>
          </div>

          <div className="cart-item-pic-div">
            {this.props.cartItem.gallery.length > 1 ? (
              <CartItemCarousel cartItem={this.props.cartItem} />
            ) : (
              <img
                className="cart-single-image"
                src={this.props.cartItem.gallery[0]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    cartItems: state.cartItems,

    clickedAttributes: state.clickedAttributes,
    productsList: state.productsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (item) => dispatch(addCartItem(item)),
    deleteCartItem: (id) => dispatch(deleteCartItem(id)),
    addCartItemFromCart: (id) => dispatch(addCartItemFromCart(id)),
    deleteCartItemFromCart: (id) => dispatch(deleteCartItemFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemMain);
