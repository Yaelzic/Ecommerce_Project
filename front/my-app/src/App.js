
import './App.css';
import Banner from './routes/Banner/Banner';
import Content from './routes/Content';
import Header from './routes/Header/Header';
import Footer from './routes/Footer/Footer';
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from 'react'
import { selectToken, doSignOutAsync } from '../src/routes/Login/loginSlice'
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const myToken = localStorage.getItem("token")
  if (myToken){
   if (myToken && jwtDecode(myToken).exp < Date.now() / 1000){ 
     console.log('remove')
    localStorage.removeItem("token");}
  }
  //const token = useSelector(selectToken);
 //const dispatch = useDispatch();
  //if (token){
   // if (token && jwtDecode(token).exp < Date.now() / 1000){
   //   console.log(token)
    //  console.log("remove")
   //   dispatch(doSignOutAsync({token}))}
 // }
  return (
    <div className="App">
      <Header></Header>
      <Banner></Banner>
      <Content></Content>
      <Footer></Footer>
    </div >
  );
}

export default App;
