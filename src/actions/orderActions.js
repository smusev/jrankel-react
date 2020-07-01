import Axios from "axios";
import {
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL, 
    ORDER_DELETE_REQUEST, 
    ORDER_DELETE_SUCCESS, 
    ORDER_DELETE_FAIL
} from "./actionTypes";
let apiUrl = process.env.REACT_APP_API_URL

const createOrder = (order) => async (dispatch, getState) => {
    try {
      await Axios.post(apiUrl + "/api/orders", order)
      .then(
        dispatch({ type: ORDER_CREATE_SUCCESS })
      ) 
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
}

const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    console.log('order list dispatch');
    const { data } = await Axios.get(apiUrl + "/api/orders");
    console.log('order list api');
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    console.log('order list success with data');
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }

}

const removeOrder = (orderId) => async (dispatch) => {
  try{
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId})     
    const { data } = await Axios.delete(apiUrl + "/api/orders/" + orderId);
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch(error){
    dispatch({type: ORDER_DELETE_FAIL, payload: error.message})
  }
}

export { createOrder, getOrders, removeOrder };