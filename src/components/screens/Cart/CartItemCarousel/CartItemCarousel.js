import React, { Component } from 'react';
import { generateKey } from '../../../../GenerateKey';

import './CartItemCarousel.css';

export default class CartItemCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 };

    this.SliderData = this.props.cartItem.gallery;
    this.length = this.SliderData.length;
  }

  nextSlide() {
    this.setState({
      current:
        this.state.current === this.length - 1 ? 0 : this.state.current + 1,
    });
  }

  prevSlide() {
    this.setState({
      current:
        this.state.current === 0 ? this.length - 1 : this.state.current - 1,
    });
  }

  render() {
    return (
      <section className="slider">
        <div className={`left-arrow ${this.length > 1 ? '' : 'arrows-off'}`}>
          <img
            src="./images/arrow-left_b.png"
            alt="left arrow"
            className="left-arrow-img"
            onClick={this.prevSlide.bind(this)}
          />
        </div>
        <div className={`right-arrow ${this.length > 1 ? '' : 'arrows-off'}`}>
          <img
            src="./images/arrow-right_b.png"
            alt="left arrow"
            className="left-arrow-img"
            onClick={this.nextSlide.bind(this)}
          />
        </div>

        {this.SliderData.map((slide, index) => {
          return (
            <div
              className={
                index === this.state.current ? 'slide active' : 'slide'
              }
              key={generateKey(index)}
            >
              {index === this.state.current && (
                <img src={slide} alt="travel" className="slide-image" />
              )}
            </div>
          );
        })}
      </section>
    );
  }
}
