import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { addToCart, removeFromCart } from '../actions/cartActions';

function Product(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);
    
  const addQty = () => {
    setQty(qty+1)
  }
  
  const substQty = () => {
    if (qty > 1) {
      setQty(qty-1)
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart(props.match.params.id, qty));
  }

  return(<>
    <div className="back-to-result">
      <Link to="/" className="to-homepage-button"> &#171;	На главную</Link>
    </div>
    {loading ? <div id="overlay currently-loading"><img src="/loading.gif" alt="Loading..." /></div> :
      error ? <div>{error} </div> :
        (
            <div className="details">
            <div className="details-image">
              <img src={product.picture} alt="product" ></img>
            </div>
            <div className="details-info">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-description"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ...</p></div>
              <div className="product-weight"><p>440 грамм</p></div>
              <div className="product-value">
                  <p>Количество: </p>
                  <button className="qty-button" onClick={substQty}>-</button>
                  <p className="qty-count">{qty}</p>
                  <button className="qty-button" onClick={addQty}>+</button>
                </div>
              <div className="details-action">
              <div className="add-to-cart-button">
                    <button onClick={handleAddToCart} className="to-cart-button" >Заказать</button>
              </div>
            <div className="product-price"><p>{product.price} грн.</p></div>
            </div>
            </div>
            </div>
        )
    }
  </>)
}

export default Product;