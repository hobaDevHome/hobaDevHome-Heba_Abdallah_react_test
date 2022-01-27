export const changeCurrency = (currentCurrency) => {
  return {
    type: 'change_currency',
    payload: currentCurrency,
  };
};
export const getProductsLists = (allProducts) => {
  return {
    type: 'get_products_list',
    payload: allProducts,
  };
};
export const getSelectedProductsLists = (sentCategory) => {
  return {
    type: 'get_slelected_products_list',
    payload: sentCategory,
  };
};
export const addCartItem = (item) => {
  return {
    type: 'add_cart_item',
    payload: item,
  };
};

export const addCartItemFromCart = (item) => {
  return {
    type: 'add_cart_item_from_cart',
    payload: item,
  };
};
export const deleteCartItem = (id) => {
  return {
    type: 'delete_cart_item',
    payload: id,
  };
};
export const deleteCartItemFromCart = (item) => {
  return {
    type: 'delete_cart_item_from_cart',
    payload: item,
  };
};

export const calculateTotal = (items) => {
  return {
    type: 'clac_total',
    payload: items,
  };
};
export const changeAttrubute = (id, attribute, name) => {
  return {
    type: 'change_attribute',
    payload: { id, attribute, name },
  };
};
export const changeCategory = (newCat) => {
  return {
    type: 'change_cat',
    payload: newCat,
  };
};
export const getCurrentItemNo = (item) => {
  return {
    type: 'count_itmes',
    payload: item,
  };
};
