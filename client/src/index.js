import React from 'react';
<<<<<<< HEAD
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
=======
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cadastro from './Cadastro';
import Recarga from './Recarga';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="recarga" element={<Recarga />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
>>>>>>> 844dc9c4511b601c219d64411121baab46208c72
);
