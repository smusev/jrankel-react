import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

function Main(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return () => {};
      }, []);
    
return <>
    {loading ? <div id="overlay currently-loading"><img src="/loading.gif" alt="Loading..." /></div> : 
        error ?  <div>{error}</div> :
        <div>
            { products.categories.map(category => {
                  const categoryItems = products.dishes.filter(dish => category._id === dish.category)
                  const categoryDishes = categoryItems.map(item => {
                    return (
                      <li key={item._id}>
                      <Link to={"/product/" + item._id}>
                      <div className="product">
                      <img className="product-image" src={item.picture} alt="product"/>
                      <div className="product-name">{item.name}</div>
                        <div className="product-brand">{item.name}</div>
                        <div className="product-price">{item.price} Грн.</div>
                      </div>
                      </Link>
                      </li>
                    )
                  })
                return (
                <div className="category" key={category._id}>
                    <h3 className="category-name"> {category.name} </h3>
                    <ul className="products">{categoryDishes}</ul>
                </div> 
                )}
            )}
       </div>      
    }
</>
}

export default Main;