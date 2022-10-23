import React, {useEffect} from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import {selectCategory, getCategoryAsync} from './categorySlice'
import { useSelector, useDispatch} from 'react-redux';

const Categories = (index, category) => {
    const myCategory = useSelector(selectCategory);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCategoryAsync())
    }, [])

  return (
    <div>
    {myCategory.map((category) => <NavDropdown.Item key={category.id} href={`/categories/${category.id}`}>{category.desc}</NavDropdown.Item>)}
    </div>
  )
}

export default Categories