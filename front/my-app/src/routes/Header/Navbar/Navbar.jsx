// Navbar
import React ,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { Nav, NavDropdown } from 'react-bootstrap'
import {selectCategory, getCategoryAsync} from '../../Categories/categorySlice'
import {selectAdmin} from '../../Login/loginSlice'
import { useSelector, useDispatch} from 'react-redux';
import {Link } from "react-router-dom";

export default function Navbar(props) {

  const { active } = props;
  const myCategory = useSelector(selectCategory);
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectAdmin);
 
  
  useEffect(() => {
    dispatch(getCategoryAsync())
  }, [])


  return (
    <nav className={`navbar ${active ? 'active' : ''}`}>
      <Nav.Link as={Link} to="/" >home</Nav.Link>
      {isAdmin && (<Nav.Link as={Link} to= "/admin" >admin</Nav.Link>)}
      <NavDropdown id="dropdown-basic" title="Categories">
        {myCategory.map((category) => <NavDropdown.Item key={category.id} as={Link} to={`/categories/${category.id}`}>{category.desc}</NavDropdown.Item>)}
      </NavDropdown>
    </nav>
  );  
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
