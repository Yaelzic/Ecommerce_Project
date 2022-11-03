import React, { useEffect } from 'react'
import { getOrdersAsync, selectfinalOrders, getOrderDetAsync, selectorderDetails } from '../Orders/orderSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Login/loginSlice'
import { Accordion } from 'react-bootstrap';
import './Orders.css'

/* Display orders history for connected user */

const Orders = () => {

    const dispatch = useDispatch();
    const finalOrders = useSelector(selectfinalOrders);
    const orderDetails = useSelector(selectorderDetails)
    const token = useSelector(selectToken);


    useEffect(() => {
        dispatch(getOrdersAsync(token))
        dispatch(getOrderDetAsync(token))
    }, [])


    return (
        <div className="box" >
            <h2>Orders History</h2>
            <br></br>
            <Accordion>
                {finalOrders && finalOrders.map((ord, index) =>
                    <Accordion.Item eventKey={ord.id} key={index}>
                        <Accordion.Header><h3>Order Number: {ord.id}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            Date: {ord.createdTime} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Total: {ord.total}</h3></Accordion.Header>
                        <Accordion.Body>
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
                                    {orderDetails && orderDetails.filter(x => x.order_id == ord.id)
                                        .map((det, index) =>
                                            <tr key={index}>
                                                <td><img src={`http://127.0.0.1:8000/media/${det.image}`} alt="" /></td>
                                                <td>{det.desc}</td>
                                                <td>{det.price}</td>
                                                <td>{det.amount}</td>
                                                <td>{det.total}</td>
                                            </tr>)}
                                </tbody>
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>)}
            </Accordion>

        </div>
    )
}

export default Orders