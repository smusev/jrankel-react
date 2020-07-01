import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, removeOrder } from '../actions/orderActions';

function Orders () {

    const orderList = useSelector(state => state.orderList);
    const { orders, loading, error } = orderList;
  
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
        return () => {};
    },[successDelete]);

    const removeOrderHandler = (productId) => {
        console.log('remove' + productId)
        console.log(loading)
        dispatch(removeOrder(productId));
    }

    return <>
    {loading ? <div id="overlay currently-loading"><img src="/loading.gif" alt="Loading..." /></div> : 
        error ?  <div>{error}</div> :
        <div className="orders-wrapper">
            {orders.map(order =>{
                return (<div className="order-wrapper" key={order._id}>
                  <div className="customer-info">
                    <div className="customer-name left">{order.customer.name}</div>
                    <div className="customer-phone left">{order.customer.phone}</div>
                    <div className="customer-address right">{order.customer.address}</div>
                    <button className="order-delete-button" onClick={() => removeOrderHandler(order._id)}>x</button>
                  </div>
                  <div className="order-list-wrapper">
                  {order.items.map(item => {
                      return (<div className="order-items-list" key={item._id}>
                          <div>{item.qty} x {item.name}</div>
                      </div>)
                  })}
                  </div>
                 <br/>
                 </div>
                )
            })}
       </div>      
    }</>
}

export default Orders