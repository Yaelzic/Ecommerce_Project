
import './App.css';
import Banner from './routes/Banner/Banner';
import Content from './routes/Content';
import Header from './routes/Header/Header';
import Footer from './routes/Footer/Footer';
import jwtDecode from "jwt-decode";
import React from 'react'

function App() {

  const myToken = localStorage.getItem("token")
  if (myToken) {
    if (myToken && jwtDecode(myToken).exp < Date.now() / 1000) {
      localStorage.removeItem("token");
    }
  }
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
