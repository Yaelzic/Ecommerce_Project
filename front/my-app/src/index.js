import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './routes/Products/Products';
import { Provider } from 'react-redux';
import { store } from './routes/store';
import Register from './routes/Header/UserForm/Register';
import CategoryAdmin from './routes/Categories/CategoryAdmin'
import ProductAdmin from './routes/Products/ProductAdmin';
import { Admin } from './Admin';
import Orders from './routes/Products/Orders';
import UserForm from './routes/Header/UserForm/UserForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/getOrders" element={<Orders/>}></Route>
          <Route path="/categories" >
            <Route path=":id" element={<Products />} />
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/categoryAdmin" element={<CategoryAdmin />}></Route>
          <Route path="/productAdmin" element={<ProductAdmin />}></Route>
          <Route path="/userForm" element={<UserForm />}></Route>
        </Route>
        
      </Routes>
    </Provider>
  </BrowserRouter>


);


