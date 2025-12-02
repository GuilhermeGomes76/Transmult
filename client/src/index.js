import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Conta from "./Conta";
import Cadastro from "./Cadastro";
import Recarga from "./Recarga";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recarga" element={<Recarga />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
