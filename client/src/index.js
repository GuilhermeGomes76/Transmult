import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';  
import Cadastro from './Cadastro.js';
import Recarga from './Recarga.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recarga" element={<Recarga />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
