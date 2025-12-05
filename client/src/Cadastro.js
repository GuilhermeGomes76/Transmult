import React, { useState } from 'react';
import axios from 'axios';
import Cabecalho from '../src/components/cabecalho';
import './Cadastro.css';

const API_BASE = import.meta.env.VITE_API_URL;

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!nome || !cpf || !senha) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/cadastro`, {
        nome,
        cpf,
        senha
      });

      setMensagem(res.data.mensagem);
      setNome('');
      setCpf('');
      setSenha('');
    } catch (err) {
      if (err.response && err.response.data) {
        setErro(err.response.data.erro || 'Erro no cadastro');
      } else {
        setErro('Erro ao conectar com o servidor');
      }
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="container">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleCadastro} className="form">
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          <button type="submit" className="btn">Cadastrar</button>
        </form>

        {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
        {erro && <p className="mensagem-erro">{erro}</p>}
      </div>
    </>
  );
};

export default Cadastro;
