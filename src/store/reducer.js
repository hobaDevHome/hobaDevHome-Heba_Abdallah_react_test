import CartItemModel from '../components/Models/CartItemModel';

const INITIAL_STATE = {
  query: [],
  currency: '$',
  category: 'all',
  productsList: [],
  selectedList: [],
  cartItems: [],
  clickedAttributes: [],
  totalAmount: 0,
  currentCartItemId: undefined,
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'change_currency':
      return { ...state, currency: action.payload };

    case 'get_products_list':
      localStorage.setItem('selectedList', action.payload[0]);
      return {
        ...state,
        productsList: action.payload[0],
        selectedList: action.payload[0],
        query: action.payload,
      };

    case 'get_slelected_products_list': {
      const newList = state.query.filter((cat) => cat.name === action.payload);
      return { ...state, category: action.payload, selectedList: newList[0] };
    }

    case 'add_cart_item_from_cart': {
      const prod = action.payload;
      const fouund = state.cartItems.find(
        (item) => item.itemid === prod.itemid
      );
      const indexOfFound = state.cartItems.indexOf(fouund);

      const updatedCartItem = new CartItemModel(
        state.cartItems[indexOfFound].itemid,
        state.cartItems[indexOfFound].quantity + 1,
        prod.productPrice,
        prod.productTitle,
        prod.attributes,
        prod.id,
        prod.gallery,
        prod.itemAttr
      );
      return {
        ...state,
        cartItems: state.cartItems.map((el) =>
          el.itemid === prod.itemid ? updatedCartItem : el
        ),
      };
    }

    case 'add_cart_item':
      {
        const addedProduct = action.payload;
        const prodPrice = addedProduct.prices;
        const prodTitle = addedProduct.name;
        const prodAttributes = addedProduct.attributes;
        const prodId = addedProduct.id;
        const prodGallery = addedProduct.gallery;

        const fouund = state.cartItems.find(
          (item) => item.id === addedProduct.id
        );
        const indexOfFound = state.cartItems.indexOf(fouund);

        const foundItemsArray = state.cartItems.filter(
          (item) => item.id === addedProduct.id
        );

        const foundAttributesArray = state.clickedAttributes.filter(
          (atr) => atr.id === prodId
        );

        if (fouund) {
          if (foundAttributesArray.length === 0) {
            const updatedCartItem = new CartItemModel(
              state.cartItems[indexOfFound].itemid,
              state.cartItems[indexOfFound].quantity + 1,
              prodPrice,
              prodTitle,
              prodAttributes,
              prodId,
              prodGallery,
              foundAttributesArray
            );
            return {
              ...state,
              cartItems: state.cartItems.map((el) =>
                el.id === prodId ? updatedCartItem : el
              ),
            };
          } else {
            const addItemId = checkEqualAttributes(
              foundItemsArray,
              foundAttributesArray
            );
            if (addItemId) {
              const fouund2 = state.cartItems.find(
                (item) => item.itemid === addItemId[1]
              );
              const indexOfFound2 = state.cartItems.indexOf(fouund2);

              const updatedCartItem = new CartItemModel(
                state.cartItems[indexOfFound2].itemid,
                state.cartItems[indexOfFound2].quantity + 1,
                prodPrice,
                prodTitle,
                prodAttributes,
                prodId,
                prodGallery,
                state.cartItems[indexOfFound2].itemAttr
              );
              return {
                ...state,
                cartItems: state.cartItems.map((el) =>
                  el.itemid === addItemId[1] ? updatedCartItem : el
                ),
              };
            } else {
              const newCartItem = new CartItemModel(
                new Date().toString(),
                1,
                prodPrice,
                prodTitle,
                prodAttributes,
                prodId,
                prodGallery,
                foundAttributesArray
              );
              return {
                ...state,
                cartItems: [...state.cartItems, newCartItem],
              };
            }
          }
        } else if (!fouund) {
          const newCartItem = new CartItemModel(
            new Date().toString(),
            1,
            prodPrice,
            prodTitle,
            prodAttributes,
            prodId,
            prodGallery,
            foundAttributesArray
          );
          return {
            ...state,
            cartItems: [...state.cartItems, newCartItem],
          };
        }
      }
      break;

    case 'delete_cart_item':
      {
        const foundItemsArray = state.cartItems.filter(
          (item) => item.id === action.payload
        );

        const foundAttributesArray = state.clickedAttributes.filter(
          (atr) => atr.id === action.payload
        );
        const selectedCartItem = state.cartItems.find(
          (item) => item.id === action.payload
        );
        const indexOfFound = state.cartItems.indexOf(selectedCartItem);

        if (foundAttributesArray.length === 0) {
          const currentQty = selectedCartItem.quantity;
          if (currentQty > 1) {
            const updatedCartItem = new CartItemModel(
              state.cartItems[indexOfFound].itemid,
              selectedCartItem.quantity - 1,
              selectedCartItem.productPrice,
              selectedCartItem.productTitle,
              selectedCartItem.attributes,
              selectedCartItem.id,
              selectedCartItem.gallery,
              state.cartItems[indexOfFound].itemAttr
            );
            return {
              ...state,
              cartItems: state.cartItems.map((el) =>
                el.itemid === selectedCartItem.itemid ? updatedCartItem : el
              ),
            };
          } else {
            return {
              ...state,
              cartItems: state.cartItems.filter(
                (el) => el.id !== action.payload
              ),
            };
          }
        } else {
          const addItemId = checkEqualAttributes(
            foundItemsArray,
            foundAttributesArray
          );
          if (addItemId) {
            const fouund2 = state.cartItems.find(
              (item) => item.itemid === addItemId[1]
            );
            const indexOfFound2 = state.cartItems.indexOf(fouund2);

            const currentQty2 = fouund2.quantity;

            if (currentQty2 > 1) {
              const updatedCartItem = new CartItemModel(
                state.cartItems[indexOfFound2].itemid,
                selectedCartItem.quantity - 1,
                selectedCartItem.productPrice,
                selectedCartItem.productTitle,
                selectedCartItem.attributes,
                selectedCartItem.id,
                selectedCartItem.gallery,
                state.cartItems[indexOfFound2].itemAttr
              );
              return {
                ...state,
                cartItems: state.cartItems.map((el) =>
                  el.itemid === addItemId[1] ? updatedCartItem : el
                ),
              };
            } else {
              return {
                ...state,
                cartItems: state.cartItems.filter(
                  (el) => el.itemid !== addItemId[1]
                ),
              };
            }
          }
        }
      }
      break;

    case 'delete_cart_item_from_cart':
      {
        const selectedCartItem = state.cartItems.find(
          (item) => item.itemid === action.payload.itemid
        );

        if (selectedCartItem) {
          const currentQty = selectedCartItem.quantity;

          if (currentQty > 1) {
            const updatedCartItem = new CartItemModel(
              selectedCartItem.itemid,
              selectedCartItem.quantity - 1,
              selectedCartItem.productPrice,
              selectedCartItem.productTitle,
              selectedCartItem.attributes,
              selectedCartItem.id,
              selectedCartItem.gallery,
              selectedCartItem.itemAttr
            );

            return {
              ...state,
              cartItems: state.cartItems.map((el) =>
                el.itemid === selectedCartItem.itemid ? updatedCartItem : el
              ),
            };
          } else {
            return {
              ...state,
              cartItems: state.cartItems.filter(
                (el) => el.itemid !== action.payload.itemid
              ),
            };
          }
        }
      }
      break;

    case 'clac_total': {
      let calculatedAmount = 0;
      const items = action.payload;
      const prodcusPricesList = items.map((cartItem) => {
        return { l: cartItem.productPrice, q: cartItem.quantity };
      });

      prodcusPricesList.map((priceList) =>
        priceList.l.map((price) => {
          if (price.currency.symbol === state.currency) {
            calculatedAmount += price.amount * priceList.q;
            return true;
          } else {
            return false;
          }
        })
      );
      calculatedAmount = parseFloat(calculatedAmount).toFixed(2);

      return {
        ...state,
        totalAmount: calculatedAmount,
      };
    }

    case 'count_itmes': {
      const id = action.payload.id;

      const foundAttributesArray = state.clickedAttributes.filter(
        (atr) => atr.id === id
      );
      const foundItemsArray = state.cartItems.filter((item) => item.id === id);
      const fouund = state.cartItems.find((item) => item.id === id);

      const foundCommonAtt = checkEqualAttributes(
        foundItemsArray,
        foundAttributesArray
      );

      if (fouund) {
        if (foundAttributesArray.length === 0) {
          const myId = fouund.itemid;

          return {
            ...state,
            currentCartItemId: myId,
          };
        } else {
          if (foundCommonAtt) {
            return {
              ...state,
              currentCartItemId: foundCommonAtt[1],
            };
          } else {
            return {
              ...state,
              currentCartItemId: undefined,
            };
          }
        }
      } else {
        return {
          ...state,
          currentCartItemId: undefined,
        };
      }
    }

    case 'change_attribute': {
      const id = action.payload.id;
      const attribute = action.payload.attribute;
      const name = action.payload.name;
      const addClickedattribute = { id, attribute, name };

      const foundAttributesArray = state.clickedAttributes.filter(
        (atr) => atr.id === id
      );

      if (foundAttributesArray.length === 0) {
        return {
          ...state,
          clickedAttributes: [...state.clickedAttributes, addClickedattribute],
        };
      } else {
        const foundCurrentAttib = foundAttributesArray.find(
          (att) => att.name === name
        );
        if (foundCurrentAttib) {
          return {
            ...state,

            clickedAttributes: state.clickedAttributes.map((att) =>
              att.id === id && att.name === name ? addClickedattribute : att
            ),
          };
        } else {
          return {
            ...state,

            clickedAttributes: [
              ...state.clickedAttributes,
              addClickedattribute,
            ],
          };
        }
      }
    }
    case 'change_cat': {
      return {
        ...state,
        category: action.payload,
      };
    }

    default:
      return state;
  }
};

function checkEqualAttributes(arr1, arr2) {
  const chosenAttrs = arr2.map((at) => at.attribute.value);
  const attsInCart = arr1.map((at) => [
    at.itemAttr.map((at2) => at2.attribute.value),
    at.itemid,
  ]);

  const id = attsInCart.find(
    (at) => at[0][0] === chosenAttrs[0] && at[0][1] === chosenAttrs[1]
  );

  return id;
}
