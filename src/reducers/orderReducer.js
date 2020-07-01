import {
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST, 
    ORDER_DELETE_SUCCESS, 
    ORDER_DELETE_FAIL
} from "../actions/actionTypes";

function orderReducer(state = { loading: true, orders: [] }, action) {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
          return { loading: true, orders: [], reload: false };
        case ORDER_LIST_SUCCESS: 
          return { loading: false, orders: action.payload.orders };
        case ORDER_LIST_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state;
      }
}

function orderDeleteReducer (state = {loading: true}, action){
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { orderReducer, orderDeleteReducer }