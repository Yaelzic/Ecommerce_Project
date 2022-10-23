import React, { useState, useEffect } from 'react'
import { selectProds, getProductsAsync, delProductAsync } from './productSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

const ProductAdmin = () => {
    let params = useParams();
    let id = params.id;
    const myProds = useSelector(selectProds);
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams({ replace: true });
    const [myToken, setmyToken] = useState('');

    useEffect(() => {
        if (localStorage.getItem("token"))
          setmyToken((JSON.parse(localStorage.getItem("token"))).token)
      }, [])

    useEffect(() => {
        dispatch(getProductsAsync())
    }, [])

    return (
        <div>
            <input placeholder="Search"
                value={searchParams.get("filter") || ""}
                onChange={(event) => {
                    let filter = event.target.value;
                    if (filter) {
                        setSearchParams({ filter }, { replace: true });
                    } else {
                        setSearchParams({}, { replace: true });
                    }
                }}
            />
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Product</th>
                    </tr>
                </thead>
                <tbody>
                    {myProds.filter((pro) => {
                            let filter = searchParams.get("filter");
                            if (!filter) return true;
                            let name = pro.desc.toLowerCase();
                            return name.startsWith(filter.toLowerCase());
                        }).map((prod, index) =>
                        <tr key={index}>
                            <td>{prod.id}</td>
                            <td>{prod.desc}</td>
                            <td><Button onClick={() => dispatch(delProductAsync({prod, myToken}))}>Delete</Button></td>
                        </tr>)}
                </tbody>
            </table>



        </div>
    )
}

export default ProductAdmin