import React, { useState, useEffect } from 'react'
import './CategoryForm.css';
import { addCategoryAsync, selectCategory, delCategoryAsync, getCategoryAsync } from './categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../Login/loginSlice';
import {  Button } from 'react-bootstrap';


const CategoryAdmin = () => {
  const [CategoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  //const token = useSelector(selectToken);
  const [myToken, setmyToken] = useState('');
  const myCategory = useSelector(selectCategory);

  useEffect(() => {
    if (localStorage.getItem("token"))
      setmyToken((JSON.parse(localStorage.getItem("token"))).token)
  }, [])

  useEffect(() => {
    dispatch(getCategoryAsync())
  }, [])


  return (
    <div>
      <form className="catgory-form">
        <h1>Add new category</h1>
        <div className="box">
          <input id="categoryName" onChange={(e) => setCategoryName(e.target.value)} placeholder='category' />
        </div>

        <button className="btn" type='button' onClick={() => dispatch(addCategoryAsync({ CategoryName, myToken }))}>
          Add
        </button>

      </form>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {myCategory.map((category, index) =>
            <tr key = {index}>
              <td>{category.desc}</td>
              <td><Button onClick={() => dispatch(delCategoryAsync({category, myToken}))}>Delete</Button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryAdmin