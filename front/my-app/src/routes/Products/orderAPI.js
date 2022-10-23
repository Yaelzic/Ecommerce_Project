import axios from 'axios'

const url = "http://127.0.0.1:8000/orders/"
const url_det = "http://127.0.0.1:8000/orderDetails/"
const url_post = "http://127.0.0.1:8000/addOrder/"


export function fetchOrders(token) {
    return new Promise((resolve) =>
        axios(url,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}


export function fetchOrderDet(token) {
    return new Promise((resolve) =>
        axios(url_det,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}


export function sendOrders(myOrders,token) {
    return new Promise((resolve) =>
        axios.post(url_post,myOrders,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}
