import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import SearchForm from './SearchForm/SearchForm';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import UserForm from './UserForm/UserForm';
import './Header.css';
import Navbar from './Navbar/Navbar';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUserName } from '../Login/loginSlice'
import {selectorders} from '../Products/orderSlice'
import {Link } from "react-router-dom";
import WishList from './WishList/WishList';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeShoppingCart, setActiveShoppingCart] = useState(false);
  const [activeUserForm, setActiveUserForm] = useState(false);
  const [activeWishList, setActiveWishList] = useState(false);

  window.onscroll = () => {
    setActiveUserForm(false);
    setActiveShoppingCart(false);
    setActiveSearch(false);
    setActiveMenu(false);
    setActiveWishList(false);
  };
  const handleMenuButton = () => {
    setActiveMenu(!activeMenu);
    setActiveSearch(false);
    setActiveShoppingCart(false);
    setActiveUserForm(false);
    setActiveWishList(false);
  };
  const handleSearchButton = () => {
    setActiveSearch(!activeSearch);
    setActiveShoppingCart(false);
    setActiveUserForm(false);
    setActiveMenu(false);
    setActiveWishList(false);
  };
  const handleShoppingCartButton = () => {
    setActiveShoppingCart(!activeShoppingCart);
    setActiveSearch(false);
    setActiveUserForm(false);
    setActiveMenu(false);
    setActiveWishList(false);
  };
  const handleWishListButton = () => {
    setActiveWishList(!activeWishList);
    setActiveUserForm(false);
    setActiveSearch(false);
    setActiveShoppingCart(false);
    setActiveMenu(false); 
  };
  const handleUserFormButton = () => {
    setActiveUserForm(!activeUserForm);
    setActiveSearch(false);
    setActiveShoppingCart(false);
    setActiveMenu(false);
    setActiveWishList(false);
  };
  const myOrders = useSelector(selectorders);
  //const [myToken, setmyToken] = useState('');
  const userName = useSelector(selectUserName);


 
  //useEffect(() => {
   // setmyToken(JSON.parse(localStorage.getItem("token")))
  //}, [])

  return (
    <header className="header">
      <Nav.Link as={Link} to="/" className="logo">
        <i>
          <FontAwesomeIcon icon={faShoppingBasket} />
        </i>
       SHOPI
      </Nav.Link>
      <Navbar active={activeMenu} />
      <div className="icons">
        <button type="button" id="menu-btn" onClick={handleMenuButton}>
          <FontAwesomeIcon className="fa-icon" icon={faBars} />
        </button>
        <button type="button" id="search-btn" onClick={handleSearchButton}>
          <FontAwesomeIcon className="fa-icon" icon={faSearch} />
        </button>
        <button type="button" id="cart-btn" onClick={handleShoppingCartButton}>
          <FontAwesomeIcon className="fa-icon" icon={faShoppingCart} />
          <span className='badge badge-warning' id='lblCartCount'> { (myOrders && myOrders.length)} </span>
        </button>
        <button type="button" id="user-btn" onClick={handleWishListButton}>
          <FontAwesomeIcon className="fa-icon" icon={faHeart} />
        </button>
        <button type="button" id="user-btn" onClick={handleUserFormButton}>
          <FontAwesomeIcon className="fa-icon" icon={faUser} />
        </button>
        
      </div>
      
     
      <SearchForm active={activeSearch} />
      <ShoppingCart active={activeShoppingCart} />
      <UserForm active={activeUserForm} />
      <WishList active={activeWishList} />
      <h3>{userName && (<div>Hello <Nav.Link as={Link} to= "/getOrders" >{userName}</Nav.Link></div>)}</h3>
    </header>
  );
}
