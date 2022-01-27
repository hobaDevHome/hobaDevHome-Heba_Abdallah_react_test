import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCartItem } from '../../../store/actions';
import {
  deleteCartItem,
  addCartItemFromCart,
  deleteCartItemFromCart,
} from '../../../store/actions';
import OverlayAddRemove from '../../UI/Buttons/OverlayAddRemove';
import { generateKey } from '../../../GenerateKey';

import './CartItemOverlay.css';

class CartItemOverlay extends Component {
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.itemAttributes = undefined;
    this.correspondingProduct = undefined;
    this.itemPrice = undefined;
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
      <div className="overlay-cart-item">
        <div className="overlay-item-data">
          <div className="overlay-item-title-details">
            {this.props.cartItem.productTitle}
          </div>

          <div className="overlay-price-amount">
            {`${this.props.currency} ${this.itemPrice}`}
          </div>

          <div className="attr-buttons-cont">
            {this.itemAttributes !== undefined &&
              this.itemAttributes.map((attr) => {
                if (attr.name === 'Color') {
                  return (
                    <div
                      className="att-button-cart"
                      key={generateKey(attr.attribute.value)}
                    >
                      <div>
                        <p className="attr-name-cart-t">{attr.name} :</p>
                      </div>
                      <div
                        className="color-btn-in-item2"
                        style={{
                          backgroundColor: attr.attribute.value,
                        }}
                      ></div>
                    </div>
                  );
                } else {
                  return (
                    <div className="att-button-cart">
                      <div>
                        <p className="attr-name-cart-t">{attr.name} : </p>{' '}
                      </div>

                      <div className="overlat-att-in-item">
                        {attr.attribute.value}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        <div className="overlay-item-images-quantity">
          <div className="overlay-quantity-div">
            <OverlayAddRemove
              onClick={(e) => {
                e.stopPropagation();
                this.onAddItem();
              }}
            >
              +
            </OverlayAddRemove>
            <div className="overlay-quantity">
              {this.props.cartItem.quantity}
            </div>
            <OverlayAddRemove
              onClick={(e) => {
                e.stopPropagation();
                this.onDeleteItem();
              }}
            >
              -
            </OverlayAddRemove>
          </div>
          <div className="overlay-item-pic">
            <img src={this.props.cartItem.gallery[0]} alt="" />
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
    totalAmount: state.totalAmount,
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItemOverlay);
