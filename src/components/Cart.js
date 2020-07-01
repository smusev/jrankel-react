import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const handleChange = (productId, qty) => {
    if (qty > 0) {
        dispatch(addToCart(productId, qty));
    }
  }


  const checkoutHandler = () => {
    
    props.history.push("/checkout");
  }

  const cartList = cartItems.map(item => {
    return( <div className="cart-item" key={item.product}> 
       <div className="cart-image"><img src={item.image} alt={item.name}></img></div>
       <div className="cart-name"><Link to={"/product/" + item.product}>{item.name}</Link></div>
       <div className="cart-price">{item.price} грн.</div>
       <div className="">
        <button onClick={() => handleChange(item.product, item.qty - 1)} className="cart-button">
           -
        </button>
        </div>       
       <div className="cart-qty">{item.qty}</div>
       <div className="">
        <button onClick={() => handleChange(item.product, item.qty + 1)} className="cart-button">
           +
        </button>
        </div>
       <div className="">
         <button onClick={() => removeFromCartHandler(item.product)} className="cart-button-remove">
         X
         </button>
       </div>
      </div>)
    })

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        { cartItems.length === 0 
          ? <div>Ваша корзина пуста</div>
          : <div>{cartList}</div>

        }
      </ul>
    </div>
    <div className="cart-action">
      <h3>
        Количество блюд: {cartItems.reduce((a, c) => a + c.qty, 0)} 
        <br/>Итого: {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} грн.
      </h3>
      <button onClick={checkoutHandler} className="checkout-button" disabled={cartItems.length === 0}>
        Заказать
      </button>

    </div>

  </div>
}

export default Cart;