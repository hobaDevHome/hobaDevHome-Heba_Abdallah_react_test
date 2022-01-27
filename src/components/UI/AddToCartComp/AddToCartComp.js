import React, { Component } from 'react';
import AddRemove from '../Buttons/AddRemove';
import WideButton from '../Buttons/WideButton';

import { connect } from 'react-redux';
import { addCartItem } from '../../../store/actions';
import { deleteCartItem, getCurrentItemNo } from '../../../store/actions';

import './AddToCartComp.css';

class AddToCartComp extends Component {
  constructor(props) {
    super(props);
    this.state = { showMsg: false, currentCartItemId: undefined, attItemNo: 0 };
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.getOwnCartNoOfItems = this.getOwnCartNoOfItems.bind(this);
    this.myItemsNo = 0;
  }
  getOwnCartNoOfItems() {
    if (this.props.sentItem) {
      this.props.getCurrentItemNo(this.props.sentItem);

      const cItem = this.props.cartItems.find(
        (el) => el.itemid === this.props.currentCartItemId
      );

      if (cItem) {
        this.myItemsNo = cItem.quantity;
      } else {
        this.myItemsNo = 0;
      }
    }
  }

  onAddItem(clicked) {
    if (this.props.sentItem.attributes.length < 1) {
      this.props.addCartItem(this.props.sentItem);
    } else {
      const found = clicked.filter((el) => el.id === this.props.sentItem.id);

      if (found.length === this.props.sentItem.attributes.length) {
        this.props.addCartItem(this.props.sentItem);
        this.setState({ showMsg: false });
      } else {
        this.setState({ showMsg: true });
      }
    }
  }
  onDeleteItem() {
    this.props.deleteCartItem(this.props.sentItem.id);
  }
  render() {
    this.getOwnCartNoOfItems();

    return (
      <div className="add-to-cart-comp-containter">
        {this.state.showMsg && (
          <div className="pleas-add">*Please select the desired options</div>
        )}
        <div className="cart-buttons-component">
          {this.myItemsNo !== 0 && (
            <AddRemove onClick={this.onDeleteItem}>-</AddRemove>
          )}
          {this.myItemsNo === 0 ? (
            <WideButton
              onClick={() => this.onAddItem(this.props.clickedAttributes)}
            >
              add to cart
            </WideButton>
          ) : (
            this.myItemsNo
          )}

          {this.myItemsNo !== 0 && (
            <AddRemove
              onClick={() => this.onAddItem(this.props.clickedAttributes)}
            >
              +
            </AddRemove>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    clickedAttributes: state.clickedAttributes,
    currentCartItemId: state.currentCartItemId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (item) => dispatch(addCartItem(item)),
    deleteCartItem: (id) => dispatch(deleteCartItem(id)),
    getCurrentItemNo: (id) => dispatch(getCurrentItemNo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartComp);
