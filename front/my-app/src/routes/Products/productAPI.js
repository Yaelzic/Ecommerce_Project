import axios from "axios";

const url = "http://127.0.0.1:8000/products"

export function fetchProduct() {
    return new Promise((resolve) =>
        axios(url).then((res) => resolve({ data: res.data }))
    );
}

export function delProduct(id, myToken) {
    console.log(id, myToken)
    return new Promise((resolve) =>
      axios.delete(`${url}/${id}`,{
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
      }).then((res) => resolve({ data: res.data }))
    );
  }