import React, { Component } from 'react';

import ProdcutMainImage from './ProductMainImage';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddToCartComp from '../../UI/AddToCartComp/AddToCartComp';
import SizesAtributes from './SizesAtributes';
import { changeAttrubute } from '../../../store/actions';
import ProductsCarousel from './ProductsCarousel';
import { gql } from '@apollo/client';
import { clientScandiweb } from '../../../Apollo';

import './ProductDescription.css';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.onThumbClickHandler = this.onThumbClickHandler.bind(this);
    this.itemInCartCheck = this.itemInCartCheck.bind(this);
    this.getOwnCartNoOfItems = this.getOwnCartNoOfItems.bind(this);

    this.state = {
      id: undefined,
      currentImage: undefined,
      noOfItmesInCart: 1,
      currentProduct: undefined,
    };
    this.selecteProduct = {};
    this.price = 0;
    this.attributes = undefined;
    this.currentImage = undefined;
  }

  async componentDidMount() {
    const sentId = this.props.match.params.porductid;
    this.setState({ id: sentId });

    let temp;
    temp = await clientScandiweb.query({
      query: gql`
                query {
                  product(id: "${this.props.match.params.porductid}"){
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                         name
                        items {
                          displayValue
                          value
                          id
                        }
                    }
                    prices {
                      currency {
                        label
                        symbol
                      }
                      amount
                    }
                  brand
                  }
                }   
               
            `,
    });

    this.setState({
      currentProduct: temp.data.product,
    });
  }

  getOwnCartNoOfItems(quantity) {
    this.setState({ noOfItmesInCart: quantity });
  }

  itemInCartCheck() {
    const found = this.props.cartItems.find((el) => el.id === this.state.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  }
  onThumbClickHandler(thumb) {
    this.setState({ currentImage: thumb });
  }
  render() {
    if (
      this.state.id !== undefined &&
      this.state.currentProduct !== undefined
    ) {
      this.selecteProduct = this.state.currentProduct;

      this.detailsImages = this.selecteProduct.gallery;
      this.currentImage = this.detailsImages[0];
      this.price = this.selecteProduct.prices.find(
        (price) => price.currency.symbol === this.props.currency
      ).amount;

      this.attributes = this.selecteProduct.attributes;

      return (
        <div className="main">
          <div className="prodcut-desc-container">
            <div className="details-pic-div">
              <ProductsCarousel
                pics={this.selecteProduct.gallery}
                onClick={this.onThumbClickHandler}
              />
            </div>
            <div className="product-img-div">
              <ProdcutMainImage
                inStock={this.selecteProduct.inStock}
                mainImage={
                  this.state.currentImage === undefined
                    ? this.currentImage
                    : this.state.currentImage
                }
              />
            </div>
            <div className="prodcut-data-div">
              <div className="prod-title">{this.selecteProduct.name}</div>
              <SizesAtributes
                attributes={this.attributes}
                sentItme={this.selecteProduct}
                id={this.state.id}
              />

              <div className="size-desc">PRICE:</div>
              <div className="price-amount-desc">{`${this.props.currency} 
              ${this.price}`}</div>
              {this.selecteProduct.inStock && (
                <AddToCartComp
                  sentItem={this.selecteProduct}
                  getOwnCartNoOfItems={this.getOwnCartNoOfItems}
                />
              )}
            </div>
          </div>
          <p className="prod-long-desc">
            <span
              dangerouslySetInnerHTML={{
                __html: this.selecteProduct.description.replace(
                  /(<? *script)/gi,
                  'illegalscript'
                ),
              }}
            />
          </p>
        </div>
      );
    }

    return <div>Loadidng</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    productsList: state.productsList,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute) =>
      dispatch(changeAttrubute(id, attribute)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescription));
