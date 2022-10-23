// Sopping Cart
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';
import { useSelector, useDispatch } from 'react-redux';
import {selectorders, clearCart, removeItem, sendordersAsync} from '../../Products/orderSlice'
import { selectToken } from '../../Login/loginSlice'


export default function ShoppingCart(props) {
  const { active } = props;
  const dispatch = useDispatch();
  const myOrders = useSelector(selectorders);
  const token = useSelector(selectToken);
  const [errorshowd, seterrorshowd] = useState(false)
  const errorshow = () => { seterrorshowd(!errorshowd) }


  return (
    <div className={`shopping-cart ${active ? 'active' : ''}`}>
     {myOrders && myOrders.map((cart, index) =>
      <div className="box" key={index}>
        <FontAwesomeIcon className="trash-icon" icon={faTrash} onClick={() => dispatch(removeItem(cart))}/>
        <img src={`/media/${cart.img}`} alt="Product" />
        <div className="content">
          <h3>{cart.desc}</h3>
          <span className="price">price: {cart.price}</span>
          <span className="quantity">amount: {cart.amount}</span>
        </div>
      </div>)}
      {myOrders.length > 0 && <button className="btn" type='button' onClick={() => dispatch(clearCart())}>Clear Cart</button> }
      {myOrders.length > 0 && <button className="btn" type='button' onClick={() => 
       token ? (dispatch(sendordersAsync({myOrders, token})),dispatch(clearCart())) : errorshow()
       }>Create Order</button>}
      {errorshowd && <p>you are not login</p>}
    </div>
  );
}
ShoppingCart.propTypes = {
  activeShoppingCart: PropTypes.bool,
}.isRequired;
