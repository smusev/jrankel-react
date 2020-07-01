import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { Link, Redirect } from 'react-router-dom';
import InputMask from 'react-input-mask';

function Checkout(props) {
    const cart = useSelector(state => state.cart);
    const {orderSuccess} = useSelector(state => state.cart)
    const { cartItems } = cart;
    const [ order, setOrder ] = useState({phone:'', name:'', address:''});
    const dispatch = useDispatch();
    const [ message, setMessage] = useState('');

    const cartList = cartItems.map(item => {
        return( <div className="cart-item" key={item.product}> 
           <div className="cart-name"><Link to={"/product/" + item.product}>{item.name} x {item.qty}</Link></div>
           <div className="cart-price">{item.qty * item.price} грн.</div>
          </div>)
        })
    
    const handleOrder = () => {
        (order.phone === '') ? setMessage('введите номер телефона') :
        (order.name === '') ? setMessage('введите Ваше имя') :
        (order.address === '') ? setMessage('введите адрес доставки') :
        dispatch(createOrder({customer:order,items:cartItems}));  
    } 


return <div className="checkout-wrapper">
    { orderSuccess ? <Redirect to="/success" /> : null }
    <div className="checkout-form">
        <div className="input-form-wrapper">
            <InputMask className="input-form left" mask="+38 (099) 999-99-99" maskChar=" "  onChange={e => setOrder({...order, phone: e.target.value})} placeholder='+38(___) ___-__-__' value={order.phone} type="phone"/>
        </div>
        <div className="input-form-wrapper">
            <input className="input-form left" onChange={e => setOrder({...order, name: e.target.value})} placeholder='Ваше имя' value={order.name} type="name"/>
        </div>
        <div className="input-form-wrapper fullwidth">
            <textarea 
            className="input-textarea fullwidth" 
            onChange={e => setOrder({...order, address: e.target.value})} 
            placeholder='Адрес доставки' 
            value={order.address} 
            rows="5"  />
        </div>
        <p className='error-message'>{message}</p>
        <button className="checkout-button" onClick={handleOrder} >Заказать</button>
    </div>
    <div className="checkout-summary">
        {cartList}
    </div>
    </div>

}

export default Checkout;