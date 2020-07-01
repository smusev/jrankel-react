import { CART_ADD_ITEM, CART_REMOVE_ITEM, ORDER_CREATE_SUCCESS } from "../actions/actionTypes";
import Cookies from "js-cookie";

let cartHistory = (Cookies.get('cartItems')) ? JSON.parse(Cookies.get('cartItems')) : [];

function cartReducer(state = { cartItems: cartHistory, orderSuccess: false, shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);
      if (product) {
        return {
          cartItems:
            state.cartItems.map(x => x.product === product.product ? item : x)
        };
      }
      return { cartItems: [...state.cartItems, item], orderSuccess: false };
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
    case ORDER_CREATE_SUCCESS:
      console.log('order_create_sussees_dispatch')
      Cookies.remove('cartItems');
      return {cartItems: [], orderSuccess: true};
    default:
      return state
  }
}

export { cartReducer }