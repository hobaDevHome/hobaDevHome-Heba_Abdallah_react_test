import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import SizesAtributes from '../PDP/SizesAtributes';
import './ProdcutsDetailsInPLP.css';
import AddToCartComp from '../../UI/AddToCartComp/AddToCartComp';

class Backdrop extends Component {
  render() {
    return <div className="backdrop-product" onClick={this.props.onBackHide} />;
  }
}

class ProductCard extends Component {
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById('productAttirbutes');

class ProdcutsDetailsInPLP extends Component {
  componentDidMount() {
    document.body.classList.add('no-scroll');
  }
  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
  }

  render() {
    return (
      <Fragment>
        <div>
          {ReactDOM.createPortal(
            <Backdrop
              onBackHide={(e) => {
                e.stopPropagation();
                this.props.onHide();
              }}
            />,
            portalElement
          )}
          {ReactDOM.createPortal(
            <ProductCard>
              <div className="header-clone-p">
                <div className="header-row-clone-p">
                  <div className="currency-list-p">
                    <div className="details-screen-title">
                      Please selecet the desired options:
                    </div>
                    {this.props.attributes !== 0 && (
                      <SizesAtributes
                        attributes={this.props.attributes}
                        sentItem={this.props.sentItem}
                        id={this.props.id}
                      />
                    )}

                    <div className="add-to-cart-comp">
                      {this.props.sentItem.inStock && (
                        <AddToCartComp
                          sentItem={this.props.sentItem}
                          clicked={this.props.clicked}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ProductCard>,
            portalElement
          )}
        </div>
      </Fragment>
    );
  }
}

export default ProdcutsDetailsInPLP;
