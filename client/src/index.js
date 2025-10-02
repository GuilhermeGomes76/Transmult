import React from 'react';
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
);
