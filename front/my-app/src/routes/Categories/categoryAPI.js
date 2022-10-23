import axios from "axios";

const url = "http://127.0.0.1:8000/categories"
const post_url = "http://127.0.0.1:8000/addCategory/"


export function fetchCategory() { 
    return new Promise((resolve) =>
        axios(url).then((res) => resolve({ data: res.data }))
    );
}

export function addCategory(CategoryName,myToken) {
    console.log(CategoryName, myToken)
    return new Promise((resolve) =>    
        axios.post(post_url,{"desc":CategoryName},{
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}

export function delCategory(id, myToken) {
    return new Promise((resolve) =>
      axios.delete(`${url}/${id}`,{
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
      }).then((res) => resolve({ data: res.data }))
    );
  }