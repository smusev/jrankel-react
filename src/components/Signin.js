import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';

function Signin (props) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { loading , userInfo, error } = userSignin;
    const redirect = '/'
    
    useEffect(() => {
        if (userInfo) {
          // eslint-disable-next-line
          props.history.push(redirect);
        }
        return () => {
          //
        };
     }, [userInfo]);

    const submitHandler = () => {
      dispatch(signin(phone, password));
    }

    return <div className="signin-wrapper">
        <div><h2>Регистрация</h2></div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
        <div>
            <label className="">Номер телефона</label>
        </div>
        <div>    
            <input type="tel" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div>          
            <label htmlFor="password">Пароль</label>
        </div>
        <div>    
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div><button type="submit" className="button primary" onClick={submitHandler}>Войти</button></div>
        <div>
            <Link to={redirect === "/" ? "signup" : "signup?redirect=" + redirect} className="button secondary text-center" >Создать аккаунт</Link>
        </div>
    </div>
}

export default Signin;