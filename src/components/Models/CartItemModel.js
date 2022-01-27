class CartItemModel {
  constructor(
    itemid,
    quantity,
    productPrice,
    productTitle,
    attributes,
    id,
    gallery,
    itemAttr
  ) {
    this.itemid = itemid;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.attributes = attributes;
    this.id = id;
    this.gallery = gallery;
    this.itemAttr = itemAttr;
  }
}
export default CartItemModel;
