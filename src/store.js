import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { orderReducer, orderDeleteReducer } from './reducers/orderReducer';
import { signinReducer } from './reducers/userReducer';

const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
    userSignin: { userInfo },
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    orderList: orderReducer,
    orderDelete: orderDeleteReducer,
    userSignin: signinReducer
})


const composeEnhancer = compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;