import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../actions/userActions';

function Signup (props) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
        dispatch(signup(name, phone, password));
      }

    return <div className="signin-wrapper">
        <div><h2>Регистрация</h2></div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
        <div>
            <label>Ваше Имя</label>
        </div>
        <div>    
            <input type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
            <label>Номер телефона</label>
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
        <div><button type="submit" className="button primary" onClick={submitHandler}>Зарегистрироваться</button></div>
        <div>
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Войти</Link>
        </div>
   </div>
}

export default Signup;