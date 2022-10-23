import axios from "axios";

const url = "http://localhost:3005/cart"

export function fetchCart() {
    return new Promise((resolve) =>
        axios(url).then((res) => resolve({ data: res.data }))
    );
}

export const addCart = (newProd) => {
    console.log(newProd);
    return new Promise((resolve) =>
    axios.post(url, newProd).then((res) => resolve(newProd))
  );
};
 
export const delCart = (id) => {
    console.log(id);
    return new Promise((resolve) =>
    axios.delete(`http://localhost:3005/cart/${id}`).then((res) => resolve(id))
  );
};
