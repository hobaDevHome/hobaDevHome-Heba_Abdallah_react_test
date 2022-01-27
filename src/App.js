import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../src/components/UI/Header/Header';
import ProductsPage from './components/screens/PLP/ProductsPage';
import ProductDescription from './components/screens/PDP/ProductDescription';

import Cart from './components/screens/Cart/Cart';

import { getProductsLists } from './store/actions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: undefined, selectedProducts: undefined };
  }

  render() {
    return (
      <div className="app-container">
        <div className="App">
          <Header ifActive={this.state.active} setAtive={this.setActive} />

          <Switch>
            <Route exact path="/">
              <ProductsPage category={this.props.category} />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/detials/:porductid">
              <ProductDescription />
            </Route>
          </Switch>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsLists: (list) => dispatch(getProductsLists(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
