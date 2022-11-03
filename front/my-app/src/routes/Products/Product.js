import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { BsFillCartPlusFill } from "react-icons/bs";
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addWishAsync } from '../Header/WishList/wishSlice'
import { selectorders } from '../Orders/orderSlice'
import { selectToken } from '../Login/loginSlice'
import SingleProduct from './SingleProduct';
import { Modal } from 'react-bootstrap';

/* Display single product */

const Product = ({ index, prod, addToCart, removeFromCart }) => {
    const [showd, setshowd] = useState(false)
    const show = () => { setshowd(!showd) }
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const myOrders = useSelector(selectorders);
    const [singleShow, setsingleShow] = useState(false);
    const handleSingleClose = () => setsingleShow(false);
    const handleSingleShow = () => setsingleShow(true);


    return (

        <div className="box" >
            {token && (<div style={{ textAlign: 'left' }}>
                <Button type="button" id="cart-btn" onClick={() => dispatch(addWishAsync({ prod, token }))}>
                    <FontAwesomeIcon className="fa-icon" icon={faHeart} />
                </Button>
            </div>)}
            <img src={`http://127.0.0.1:8000/media/${prod.image}`} onClick={() => handleSingleShow()} />
            <h3>{prod.desc}</h3>
            <p>{prod.price} ILS</p>
            {myOrders.filter(x => x.id === prod.id).map((ord, index) => (ord.amount)) <= 0 &&
                <Button type="button" id="cart-btn"
                    onClick={() => {
                        addToCart({ desc: prod.desc, id: prod.id, price: prod.price, img: prod.image });
                    }} >
                    <BsFillCartPlusFill style={{ fontSize: 30 }} > </BsFillCartPlusFill>
                </Button>}
            {myOrders.filter(x => x.id === prod.id).map((ord, index) => (ord.amount)) > 0 &&
                <div >
                    <Button onClick={() => addToCart({ desc: prod.desc, id: prod.id, img: prod.image })}>+</Button>
                    <a>{myOrders.filter(x => x.id === prod.id).map((ord, index) => (ord.amount))}</a>
                    <Button onClick={() => removeFromCart({ desc: prod.desc, id: prod.id, img: prod.image })}>-</Button>
                </div>}

            <Modal show={singleShow} onHide={handleSingleClose}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <SingleProduct prod={prod} addToCart={addToCart} removeFromCart={removeFromCart}></SingleProduct>
            </Modal>
        </div>

    )
}

export default Product