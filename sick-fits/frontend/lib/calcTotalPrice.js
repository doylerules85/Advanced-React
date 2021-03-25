// set up calc function with parameter to the cart
export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    // if an item gets delted from products and it was in the user's cart
    if (!cartItem.product) {
      return tally;
    }
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
