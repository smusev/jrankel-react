import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_FAIL
  } from "./actionTypes";
import axios from 'axios';
import Cookie from "js-cookie";


const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/dishes/" + productId);
    dispatch({ 
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.picture,
            price: data.price,
            qty
        }
     });
     const { cart: { cartItems } } = getState();
     Cookie.set("cartItems", JSON.stringify(cartItems));
     console.log(cartItems)
  } catch (error) {
    dispatch({ type: CART_FAIL, payload: error.message });
  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart }