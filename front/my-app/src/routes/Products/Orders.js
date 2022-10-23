import React, { useEffect, useState } from 'react'
import { getOrdersAsync, selectfinalOrders, getOrderDetAsync, selectorderDetails } from '../Products/orderSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Login/loginSlice'
import { Button, Accordion } from 'react-bootstrap';


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
        <div>
            {/*}  <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {finalOrders && finalOrders.map((ord, index) =>
                        <tr key={index}>
                            <td>{ord.createdTime}</td>
                            <td>{ord.total}</td>
                            <td><Button onClick={() => dispatch(getOrderDetAsync({ ord, token }))}>Details</Button></td>
                        </tr>)}
                </tbody>
                    </table>*/}
            <Accordion>
            {finalOrders && finalOrders.map((ord, index) =>
                <Accordion.Item eventKey={ord.id} key = {index}>
                    <Accordion.Header>{ord.id}</Accordion.Header>
                    <Accordion.Body>
                    <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                {orderDetails && orderDetails.filter(x => x.order_id == ord.id)
                       .map((det, index) =>
                        <tr key={index}>
                            <td>{det.desc}</td>
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