<<<<<<< HEAD
import './Conta.css';
import { useNavigate } from 'react-router-dom'

function Conta() {
  return (
    <div className="Conta">
        <a>pagina 2</a>
    </div>
  );
}

export default Conta  ;
=======
import { useState } from 'react';
import Cabecalho from './components/cabecalho';
import './Conta.css';

function Conta() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    if (!nome || !cpf || !senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', { // ajuste conforme seu back-end
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, senha })
      });

      const data = await response.json();

      if (response.ok) {
        // Pega o primeiro cartão do usuário ou cria um objeto padrão caso não exista
        const cartao = data.cartoes.length > 0 ? data.cartoes[0] : { saldo: 0 };
        
        setUser({ nome: data.usuario.nome, saldo: cartao.saldo });
        setMensagem(`Bem-vindo, ${data.usuario.nome}!`);
        setSenha('');
      } else {
        setMensagem(data.erro || 'Credenciais inválidas');
        setUser(null);
      }
    } catch (err) {
      setMensagem("Erro na conexão com a API.");
      console.error(err);
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMensagem('');
    setNome('');
    setCpf('');
    setSenha('');
  };

  return (
    <>
      <Cabecalho />
      <div className="Conta">
        {!user && (
          <>
            <h2>Login</h2>
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
            {mensagem && <p className="mensagem">{mensagem}</p>}
          </>
        )}

        {user && (
          <div className="cartao-fixo">
            <h3>{user.nome}</h3>
            <p>R$: {Number(user.saldo).toFixed(2)}</p> {/* saldo formatado */}
            <button className="logout" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Conta;
>>>>>>> 844dc9c4511b601c219d64411121baab46208c72
