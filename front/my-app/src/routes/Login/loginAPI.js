import axios from 'axios'

const URL = "http://127.0.0.1:8000/token/"
const URL_REGISTER = "http://127.0.0.1:8000/register/"
const URL_LOGOUT = "http://127.0.0.1:8000/logout/"

export function signin(cred) {
    return new Promise((resolve) =>
    axios.post(URL, cred).then((res) => resolve({ data: res.data }))
    );
}

export function signUp(cred) {
    return new Promise((resolve) =>
        axios.post(URL_REGISTER, cred).then((res) => resolve({ data: res.data }))
    );
}

export function logOut(token) {
    return new Promise((resolve) =>
    axios(URL_LOGOUT, {
        headers: {
            'Authorization': `Bearer ${(token.token)}`
        }
    }).then((res) => resolve({ data: res.data }))
    );
}

