// Recarga.jsx
import { useState } from 'react';
import Cabecalho from './components/cabecalho';
import './Recarga.css';

const API_BASE = 'http://localhost:5000'; // <--- use essa constante em todo o front

function Recarga() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState(null); // Usuário logado
  const [valorRecarga, setValorRecarga] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Login do usuário
  const handleLogin = async () => {
    if (!nome || !cpf || !senha) {
      setMensagem('Preencha todos os campos para continuar.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        // garante que existe pelo menos um cartão
        const cartao = data.cartoes && data.cartoes.length > 0
          ? data.cartoes[0]
          : { id: null, saldo: 0 };

        setUsuario({
          id: data.usuario.id,
          nome: data.usuario.nome,
          saldo: Number(cartao.saldo || 0),
          cartaoId: cartao.id,
        });

        setMensagem(`Bem-vindo, ${data.usuario.nome}!`);
        setSenha('');
      } else {
        setMensagem(data.erro || 'Credenciais inválidas');
        setUsuario(null);
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      setMensagem('Erro ao conectar com a API.');
      setUsuario(null);
    }
  };

  // Recarregar cartão
  const handleRecarga = async () => {
    if (!usuario || !usuario.cartaoId) {
      setMensagem('Você precisa entrar com um usuário que possua cartão.');
      return;
    }

    const valor = parseFloat(valorRecarga);
    if (isNaN(valor) || valor <= 0) {
      setMensagem('Informe um valor válido para recarga.');
      return;
    }

    const novoSaldo = Number(usuario.saldo) + valor;

    try {
      const res = await fetch(`${API_BASE}/api/cartoes/${usuario.cartaoId}/saldo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saldo: novoSaldo }),
      });

      const data = await res.json();

      if (res.ok) {
        // atualiza saldo local com o valor retornado pelo servidor (se houver)
        const saldoAtualizado = data.cartao && data.cartao.saldo !== undefined
          ? Number(data.cartao.saldo)
          : novoSaldo;

        setUsuario(prev => ({ ...prev, saldo: saldoAtualizado }));
        setMensagem(`Recarga de R$ ${valor.toFixed(2)} realizada com sucesso!`);
        setValorRecarga('');
      } else {
        setMensagem(data.erro || 'Erro ao realizar a recarga.');
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      setMensagem('Erro ao conectar com a API.');
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="Recarga">
        {!usuario && (
          <>
            <h2>Login para Recarga</h2>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
          </>
        )}

        {usuario && (
          <>
            <div className="cartao-info">
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Saldo:</strong> R$ {Number(usuario.saldo).toFixed(2)}</p>
            </div>

            <div className="recarga-form">
              <input
                type="number"
                placeholder="Valor da recarga"
                value={valorRecarga}
                onChange={(e) => setValorRecarga(e.target.value)}
                step="0.01"
                min="0"
              />
              <button onClick={handleRecarga}>Recargar</button>
            </div>

            <button
              className="logout"
              onClick={() => {
                setUsuario(null);
                setMensagem('');
                setNome('');
                setCpf('');
                setSenha('');
                setValorRecarga('');
              }}
            >
              Sair
            </button>
          </>
        )}

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </>
  );
}

export default Recarga;
