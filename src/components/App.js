import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Main from './Main';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout'
import Success from './Success'
import Orders from './Orders'
import Signin from './Signin';
import Signup from './Signup';
import { logout } from '../actions/userActions';


const App = () => {
   const dispatch = useDispatch();
   const cartStatus = useSelector(state => state.cart.cartItems)
   const userSignin = useSelector(state => state.userSignin);
   const { loading, userInfo, error } = userSignin;
  
   const openMenu = () => {
      document.querySelector('.sidebar').classList.add('open');
    };
    const closeMenu = () => {
      document.querySelector('.sidebar').classList.remove('open');
    };

    const handleLogout = () => {
       dispatch(logout());
    }
  
   const Style = {
      margin: '10px',
      padding: '10px'
    };

   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <div className="ui list" style={Style}>
         <header className="header">
            <button className="menu-button" onClick={openMenu}>&#9776;</button>
            <Link to='/' className="header-links"><h1> Smusev's Jrankel Menu </h1></Link>
            <Link to='/cart' className="header-cart">&#128722; {cartStatus.length}</Link>
         </header>
         <aside className="sidebar">
          <div className="sidebar-header">
             <h3>Jrankel menu</h3>
             <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          </div>
          <div className="sidebar-menu-wrapper">
            <div className="sidebar-menu-item">
               <Link to="/orders">Список заказов</Link>
            </div>
            <div className="sidebar-menu-item">
               <p>{userInfo ? userInfo.name : null}</p>
            </div>
            <div className="sidebar-menu-item">
               {userInfo ? <button onClick={handleLogout}>Выйти</button> : null }
            </div>
            <div className="sidebar-menu-item">
               {!userInfo ? <Link to="/signin">Войти</Link> : null }
            </div>
            <div className="sidebar-menu-item">
               {!userInfo ? <Link to="/signup">Зарегистрироваться</Link> : null}
            </div>
          </div>
         </aside>
         <main className="main">
          <div className="content">
            <Route path="/product/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/success" component={Success} />
            <Route path="/orders" component={Orders} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact={true} component={Main} />
          </div>
        </main>
        {/* dishes[0] !== undefined ? <DishItem dishes={dishes} categories={categories}/> : null*/}
         </div>
      </BrowserRouter>  
   );
}

export default App