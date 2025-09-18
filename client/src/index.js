import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';  
import Conta from './Conta.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/conta' element={<Conta/>}/>
  </Routes>
  </BrowserRouter>
);
