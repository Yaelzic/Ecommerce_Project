import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { BsFillCartPlusFill } from "react-icons/bs";
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addWishAsync } from '../Header/WishList/wishSlice'
import { selectorders } from './orderSlice'
import {selectToken} from '../Login/loginSlice'

const Product = ({ index, prod, addToCart, removeFromCart }) => {
    const [showd, setshowd] = useState(false)
    const show = () => { setshowd(!showd) }
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const myOrders = useSelector(selectorders);
    const [countshowd, setcountshowd] = useState(false)
    const countshow = () => { setcountshowd(!countshowd) }
    const [cartshowd, setcartshowd] = useState(true)
    const cartshow = () => { setcartshowd(!cartshowd) }


    return (

        <div className="box" >
            {token && ( <div style={{ textAlign: 'left' }}>
                <Button type="button" id="cart-btn" onClick={() => dispatch(addWishAsync({ prod, token }))}>
                    <FontAwesomeIcon className="fa-icon" icon={faHeart} />
                </Button>
            </div>)}
            <img src={`http://127.0.0.1:8000/media/${prod.image}`} alt="" />
            <h3>{<button size="lg" variant="link" onClick={() => show()}>{prod.desc}</button>}</h3>
            {showd && "barcode: " + prod.id}
            <br></br>
            {showd && "price: " + prod.price}
            <p>upto 45% off</p>
            {cartshowd &&
                <Button type="button" id="cart-btn"
                    onClick={() => {
                        addToCart({ desc: prod.desc, id: prod.id, price: prod.price, img: prod.image });
                        countshow(); cartshow();
                    }} >
                    <BsFillCartPlusFill style={{ fontSize: 30 }} > </BsFillCartPlusFill>
                </Button>}
            {countshowd &&
                <div >
                    <Button onClick={() => addToCart({ desc: prod.desc, id: prod.id, img: prod.image })}>+</Button>
                    {myOrders.filter(x => x.id === prod.id).map((ord, index) => (ord.amount))}
                    <Button onClick={() => removeFromCart({ desc: prod.desc, id: prod.id, img: prod.image })}>-</Button>
                </div>}
        </div>

    )
}

export default Product