import axios from "axios";

const url = "http://127.0.0.1:8000/wish"
const post_url = "http://127.0.0.1:8000/addWish/"


export function fetchWish(myToken) {
    return new Promise((resolve) =>
        axios(url,{
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}

export function addWish(product,myToken) {
    return new Promise((resolve) =>    
        axios.post(post_url,{'product' : product},{
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}

export function delWish(id, myToken) {
    return new Promise((resolve) =>
      axios.delete(`${url}/${id}`,{
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
      }).then((res) => resolve({ data: res.data }))
    );
  }