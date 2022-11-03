import React, { useState } from 'react'
import './CheckOut.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectorders, clearCart, sendordersAsync } from '../Orders/orderSlice'
import { selectToken } from '../Login/loginSlice'
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import PopLogin from '../Login/PopLogin';

/* Checkour form */

const CheckOut = () => {
    const dispatch = useDispatch();
    const myOrders = useSelector(selectorders);
    const token = useSelector(selectToken);
    const [errorshowd, seterrorshowd] = useState(false)
    const errorshow = () => { seterrorshowd(!errorshowd) }
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [singleShow, setsingleShow] = useState(false);
    const handleSingleClose = () => setsingleShow(false);
    const handleSingleShow = () => setsingleShow(true);
    const [loginShow, setLoginShow] = useState(false);
    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);

    const submitHandler = (e) => {
        e.preventDefault();
        if (firstName !== '' && lastName !== '' && email !== '' && adress !== '' && country !== '' && state !== '' && zip !== '') {
            if (token) {
                dispatch(sendordersAsync({ myOrders, token }));
                dispatch(clearCart());
                document.getElementById("myForm").reset();
                handleSingleShow();
            }
            else handleLoginShow()

        }
    };
    return (
        <div className="container">
            <div className="py-5 text-center">
                <h1>Checkout</h1>
            </div>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form id="myForm" className="needs-validation" onSubmit={submitHandler}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" required onChange={(e) => setFirstName(e.target.value)}></input>
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" required onChange={(e) => setLastName(e.target.value)}></input>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}></input>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required onChange={(e) => setAdress(e.target.value)}></input>
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-md-5">
                                <label className="form-label">Country</label>
                                <select className="form-select" id="country" required onChange={(e) => setCountry(e.target.value)}>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">State</label>
                                <select className="form-select" id="state" required onChange={(e) => setState(e.target.value)}>
                                    <option value="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required onChange={(e) => setZip(e.target.value)}></input>
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4"></hr>

                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" required ></input>
                                <label className="form-check-label" >Credit card</label>
                            </div>
                            <div className="form-check">
                                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" >PayPal</label>
                            </div>
                        </div>
                        <hr className="my-4"></hr>
                        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                    </form>
                </div>
            </div>
            {errorshowd && <p>you are not login</p>}
            <Modal show={singleShow} onHide={handleSingleClose}
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Title style={{ padding: "3rem", textAlign: "center" }} id="contained-modal-title-vcenter"><h1>Thanks for your order</h1></Modal.Title>
                <hr></hr>
                <Nav.Link className="btn" as={Link} to="/" >Return to home page</Nav.Link>
            </Modal>
            <Modal show={loginShow} onHide={handleLoginClose}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <PopLogin></PopLogin>
            </Modal>
        </div>
    )
}

export default CheckOut