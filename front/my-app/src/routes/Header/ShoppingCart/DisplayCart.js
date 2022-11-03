import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DisplayCart.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectorders, clearCart, removeItem, sendordersAsync } from '../../Orders/orderSlice'
import { selectToken } from '../../Login/loginSlice'
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap'

/* Display shopping cart */

const DisplayCart = () => {

    const dispatch = useDispatch();
    const myOrders = useSelector(selectorders);
    const token = useSelector(selectToken);
    const [errorshowd, seterrorshowd] = useState(false)
    const errorshow = () => { seterrorshowd(!errorshowd) }
    return (
        <div className={"display-cart"}>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {myOrders && myOrders.map((cart, index) =>
                        <tr key={index}>
                            <td><img src={`/media/${cart.img}`} alt="Product" /></td>
                            <td>{cart.desc}</td>
                            <td>{cart.price}</td>
                            <td>{cart.amount}</td>
                            <td>{cart.price * cart.amount}</td>
                            <td><FontAwesomeIcon className="trash-icon" icon={faTrash} onClick={() => dispatch(removeItem(cart))} /></td>
                        </tr>)}
                </tbody>
            </table>
            <div className='button'>
                {myOrders.length > 0 && <Nav.Link className="btn" as={Link} to="/checkOut" >Checkout</Nav.Link>}
            </div>
            {errorshowd && <p>you are not login</p>}
        </div>
    )
}

export default DisplayCart