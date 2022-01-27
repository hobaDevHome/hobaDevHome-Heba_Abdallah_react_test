import React, { Component } from 'react';
import ProdcutsDetailsInPLP from './ProdcutsDetailsInPLP';

import { connect } from 'react-redux';
import { BsCart2 } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import { changeAttrubute, addCartItem } from '../../../store/actions';

import './ProductItem.css';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { showMsg: false };
    this.getOwnCartNoOfItems = this.getOwnCartNoOfItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.showProcutDetailsHandler = this.showProcutDetailsHandler.bind(this);
    this.hideProcutDetailsHandler = this.hideProcutDetailsHandler.bind(this);

    this.state = { noOfItmesInCart: 1, showProcutDetails: false };
  }

  itemProduct = this.props.product;
  price = 0;
  itemImage;
  attributes = 0;

  showProcutDetailsHandler() {
    if (this.attributes !== 0) {
      this.setState({ showProcutDetails: true });
    } else {
      this.onAddItem(this.itemProduct);
    }
  }
  hideProcutDetailsHandler() {
    this.setState({ showProcutDetails: false });
  }

  onAddItem(item) {
    this.setState({ noOfItmesInCart: this.state.noOfItmesInCart + 1 });
    this.props.addCartItem(item);
  }

  getOwnCartNoOfItems(quantity) {
    this.setState({ noOfItmesInCart: quantity });
  }

  linkComponent() {
    return (
      <Link to={`/detials/${this.props.id}`} className="linking">
        <div className="item-image-container">
          <img
            className="item-image out-of-stock"
            src={this.itemImage}
            alt=""
          />
          <div className="out-lable">
            <p>OUT OF STOCK</p>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    this.itemImage = this.itemProduct.gallery[0];
    this.price = this.itemProduct.prices.find(
      (price) => price.currency.symbol === this.props.currency
    ).amount;
    if (
      this.props.product.attributes[0] &&
      this.props.product.attributes[0].items !== undefined
    ) {
      this.attributes = this.props.product.attributes;
    }

    return (
      <div className={!this.props.inStock ? 'item out-of-stock' : 'item'}>
        {this.linkComponent()}
        <p className="title">{this.itemProduct.name}</p>
        <p className="title">Brand : {this.itemProduct.brand}</p>
        <p className="price">{`${this.props.currency} ${this.price}`}</p>
        {this.props.inStock && (
          <div
            className="item-cart-icon"
            onClick={(e) => {
              e.stopPropagation();
              this.showProcutDetailsHandler();
            }}
          >
            <BsCart2 size={20} color={'white'} />
          </div>
        )}

        {this.state.showProcutDetails && (
          <ProdcutsDetailsInPLP
            opened={this.state.showProcutDetails}
            attributes={this.attributes}
            sentItem={this.itemProduct}
            id={this.itemProduct.id}
            clicked={this.props.clickedAttributes}
            onHide={this.hideProcutDetailsHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    clickedAttributes: state.clickedAttributes,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute) =>
      dispatch(changeAttrubute(id, attribute)),
    addCartItem: (item) => dispatch(addCartItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
