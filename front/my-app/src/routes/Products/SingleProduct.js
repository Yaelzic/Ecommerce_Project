import React from 'react'
import productSlice from './productSlice'
import { useSelector } from 'react-redux';
import { selectorders } from '../Orders/orderSlice'
import { Button } from 'react-bootstrap';
import { BsFillCartPlusFill } from "react-icons/bs";
import './SingleProduct.css'

/* Pop up product */

const SingleProduct = ({ prod, addToCart, removeFromCart }) => {

    const myOrders = useSelector(selectorders);

    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-13">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="images p-3">
                                    <div className="text-center p-4"> <img className="main-image" src={`http://127.0.0.1:8000/media/${prod.image}`}></img> </div>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand"><h2>{prod.desc}</h2></span>
                                        <div className="price d-flex flex-row align-items-center"> <span className="act-price">{prod.price} ILS</span></div>
                                        <hr></hr>
                                        <h5 className="text-uppercase">company: {prod.company}</h5>
                                        <h5 className="text-uppercase">barcode: {prod.id}</h5>
                                    </div>
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct