
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectorders, removeItem, addItem, sendCart } from '../../Orders/orderSlice'
import { selectToken } from '../../Login/loginSlice'
import { Link } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap'


/* Display small shopping cart in the navbar */

export default function ShoppingCart(props) {
  const { active } = props;
  const dispatch = useDispatch();
  const myOrders = useSelector(selectorders);
  const token = useSelector(selectToken);
  const [counter, setcounter] = useState(1);
  const [total, settotal] = useState(0);

  useEffect(() => { }, [counter])

  /* Add to cart function */
  const addToCart = (item) => {
    let tempTotal = 0;
    setcounter(counter + 1);
    let found = false;
    let tempOrders = JSON.parse(JSON.stringify(myOrders))
    {
      tempOrders && tempOrders.forEach((element) => {
        if (element.id === item.id) {
          found = true;
          element.amount += 1;
          dispatch(sendCart(tempOrders))
        }
      });
    }
    if (!found) {
      item.amount = 1;
      let temp = JSON.parse(JSON.stringify(item))
      dispatch(addItem(temp))
    }
    {
      myOrders && myOrders.forEach((element) => {
        tempTotal += element.amount * element.price;
      });
    }
    settotal(tempTotal)
  };

  /* Remove from cart function */
  const removeFromCart = (item) => {
    let found = false;
    setcounter(counter + 1);
    let tempOrders = JSON.parse(JSON.stringify(myOrders))
    tempOrders.forEach((element) => {
      if (element.id === item.id) {
        found = true;
        if (element.amount === 1) {
          dispatch(removeItem(item))
        } else {
          element.amount -= 1;
          dispatch(sendCart(tempOrders))
        }
      }
    });
  };


  return (
    <div className={`shopping-cart ${active ? 'active' : ''}`}>
      {myOrders && myOrders.map((cart, index) =>
        <div className="box" key={index}>
          <FontAwesomeIcon className="trash-icon" icon={faTrash} onClick={() => dispatch(removeItem(cart))} />
          <img src={`/media/${cart.img}`} alt="Product" />

          <div className="content">
            <p><span>{cart.desc}</span>{/*<span className="quantity"> x  {cart.amount}</span>*/}</p>
            <span className="price">price: {cart.price}</span>
            <span className="total">Total: {cart.price * cart.amount}</span>
          </div>
          <div className="amount">
            <Button onClick={() => addToCart({ desc: cart.desc, id: cart.id, img: cart.image })}>+</Button>
            <a>{myOrders.filter(x => x.id === cart.id).map((ord, index) => (ord.amount))}</a>
            <Button onClick={() => removeFromCart({ desc: cart.desc, id: cart.id, img: cart.image })}>-</Button>
          </div>
        </div>)}

      {myOrders.length > 0 && <hr className="my-4"></hr>}
      <div className="total">
        <span >
          {myOrders.length > 0 && "Total:" + myOrders.reduce((a, v) => a = a + (Number(v.price * v.amount || 0)), 0)}
        </span>
      </div>
      {myOrders.length > 0 && <Nav.Link className="btn" as={Link} to="/displayCart" >Show cart</Nav.Link>}
      {myOrders.length > 0 && <Nav.Link className="btn" as={Link} to="/checkOut" >Checkout</Nav.Link>}
    </div>
  );
}
ShoppingCart.propTypes = {
  activeShoppingCart: PropTypes.bool,
}.isRequired;
