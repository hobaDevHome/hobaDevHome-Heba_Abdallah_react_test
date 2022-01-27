import React, { Component } from "react";
import CartOverlay from "../../screens/Cart/CartOverlay";
import { BsCart2 } from "react-icons/bs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gql } from "@apollo/client";
import CurrencytOverlay from "./CurrencyOverlay";
import { generateKey } from "../../../GenerateKey";

import { clientScandiweb } from "../../../Apollo";
import {
  changeCurrency,
  getSelectedProductsLists,
  changeCategory,
} from "../../../store/actions";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.showCartOverlay = this.showCartOverlay.bind(this);
    this.hideCartOverlay = this.hideCartOverlay.bind(this);
    this.showCurrencyList = this.showCurrencyList.bind(this);
    this.hideCurrencyList = this.hideCurrencyList.bind(this);
    this.toggleCurrencyList = this.toggleCurrencyList.bind(this);
    this.onChooseCurrencyHandler = this.onChooseCurrencyHandler.bind(this);
    this.onChosseCatHandler = this.onChosseCatHandler.bind(this);
    this.getCartItemsNo = this.getCartItemsNo.bind(this);

    this.getCurrencyNames = this.getCurrencyNames.bind(this);

    this.state = {
      showCartModal: false,
      showCurrency: false,
      showInfo1: false,
    };
    this.numcerOfItems = 0;
    this.categoryNames = ["all", "clothes", "tech"];
    this.currencyNames = undefined;
    this.tempCurNames = undefined;
    this.rightOffset = 0;
  }

  componentDidMount() {
    this.onChosseCatHandler(this.props.category);
    clientScandiweb
      .query({
        query: gql`
          query getCurr {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.tempCurNames = result.data.currencies;
      });
  }
  showCartOverlay() {
    this.setState({ showCartModal: true });
    this.hideCurrencyList();
  }
  hideCartOverlay() {
    this.setState({ showCartModal: false });
  }

  showCurrencyList() {
    this.setState({ showCurrency: true });
  }
  hideCurrencyList() {
    this.setState({ showCurrency: false });
  }
  toggleCurrencyList() {
    this.hideCartOverlay();
    this.setState({ showCurrency: !this.state.showCurrency });
  }

  onChooseCurrencyHandler(newCurrency) {
    this.props.changeCurrency(newCurrency);

    this.hideCurrencyList();
  }

  onChosseCatHandler(choosecCat) {
    this.props.changeCategory(choosecCat);
  }
  getCartItemsNo() {
    let amuont = 0;

    this.props.cartItems.map((el) => (amuont += el.quantity));

    this.numcerOfItems = amuont;
  }

  getCurrencyNames() {
    if (this.tempCurNames !== undefined) {
      this.currencyNames = this.tempCurNames.map(
        (prod) => `${prod.symbol} ${prod.label}`
      );
    }
  }
  render() {
    if (this.props.query !== undefined) {
      this.getCartItemsNo();

      this.getCurrencyNames();
    }
    return (
      <div className="header-row  header-in-app">
        <div className="currency-modal">
          {this.state.showCartModal && (
            <CartOverlay
              onHide={this.hideCartOverlay.bind(this)}
              opened={this.state.showCartModal}
            />
          )}
        </div>

        <div className="links-section">
          <ul>
            {this.categoryNames.map((cat) => {
              return (
                <Link to="/" key={generateKey(cat.length)}>
                  <li
                    className={`cat-link ${
                      this.props.category === cat ? "acitve-cat" : ""
                    }`}
                    onClick={() => this.onChosseCatHandler(cat)}
                  >
                    <p>{cat}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="bag-section">
          <Link to="/">
            <img src="./images/bag-icon.png" alt="" />
          </Link>
        </div>
        <div className="cart-section">
          <div className="currency-modal">
            {this.state.showCartModal && (
              <CartOverlay onHide={this.hideCartOverlay.bind(this)} />
            )}
          </div>
          <div
            className="currency-icons-section"
            onClick={this.toggleCurrencyList.bind(this)}
          >
            <div className="currency-modal">
              {this.state.showCurrency && (
                <CurrencytOverlay
                  offset={this.rightOffset}
                  onHide={this.hideCurrencyList}
                  currNames={this.currencyNames}
                  onChooseCurrencyHandler={this.onChooseCurrencyHandler}
                />
              )}
            </div>
            <div className="currencyAmount">{this.props.currency}</div>
            <div className="currency">
              {this.state.showCurrency ? (
                <BsChevronUp size={10} />
              ) : (
                <BsChevronDown size={10} />
              )}
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              this.showCartOverlay();
            }}
            className={`cart-icon ${
              this.props.cartItems.length > 0 ? "cart-badge-visible" : ""
            }`}
          >
            <BsCart2 size={20} />
            <div className="cart-badge">{this.numcerOfItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    category: state.category,
    cartItems: state.cartItems,
    productsList: state.productsList,
    query: state.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (curr) => dispatch(changeCurrency(curr)),
    getSelectedProductsLists: (cat) => dispatch(getSelectedProductsLists(cat)),
    changeCategory: (cat) => dispatch(changeCategory(cat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
