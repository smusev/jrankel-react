import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT,
  USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
  //TODO USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "./actionTypes";

const signin = (phone, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { phone, password } });
  try {
    const { data } = await Axios.post("http://localhost:8000/user/signin", { phone, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

const signup = (name, phone, password) =>  async (dispatch) => {
  dispatch({type: USER_SIGNUP_REQUEST, payload: { name, phone, password }});
  try {
    const { data } = await Axios.post("http://localhost:8000/user/signup", { name, phone, password });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
  }
}


export {signin, logout, signup}