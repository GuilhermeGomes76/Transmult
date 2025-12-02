// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = 'cartoes.json';
let db = { usuarios: [], cartoes: [] };

// Carrega DB do arquivo (cria se não existir)
function loadDB() {
  if (fs.existsSync(dbFile)) {
    try {
      db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    } catch (err) {
      console.error('Erro ao ler DB, recriando arquivo:', err);
      db = { usuarios: [], cartoes: [] };
      saveDB();
    }
  } else {
    saveDB();
  }
}

function saveDB() {
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

loadDB();

// ------------------ Rota: cadastro ------------------
app.post('/api/cadastro', (req, res) => {
  const { nome, cpf, senha } = req.body;

  if (!nome || !cpf || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  if (db.usuarios.find(u => u.cpf === cpf)) {
    return res.status(400).json({ erro: 'CPF já cadastrado' });
  }

  const id = db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
  const senhaHash = CryptoJS.SHA256(senha).toString();

  db.usuarios.push({ id, nome, cpf, senhaHash });

  // cria automaticamente um cartão inicial
  const cartaoId = db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id)) + 1 : 1;
  const cartao = {
    id: cartaoId,
    usuarioId: id,
    numero: `0000-0000-${String(cartaoId).padStart(4, '0')}`,
    tipo: 'Padrão',
    operadora: 'TransMult',
    saldo: 0.00,
    cotas: 0
  };
  db.cartoes.push(cartao);

  saveDB();
  res.status(201).json({ mensagem: 'Usuário e cartão cadastrados com sucesso!', usuario: { id, nome, cpf }, cartao });
});

// ------------------ Rota: login ------------------
app.post('/api/login', (req, res) => {
  const { nome, cpf, senha } = req.body;

  if (!nome || !cpf || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  const senhaHash = CryptoJS.SHA256(senha).toString();
  const usuario = db.usuarios.find(u => u.nome === nome && u.cpf === cpf && u.senhaHash === senhaHash);

  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const cartoes = db.cartoes.filter(c => c.usuarioId === usuario.id);
  res.json({ mensagem: 'Login bem-sucedido!', usuario: { id: usuario.id, nome: usuario.nome, cpf: usuario.cpf }, cartoes });
});

// ------------------ Rota: cadastrar cartão ------------------
app.post('/api/cartoes', (req, res) => {
  const { usuarioId, numero, tipo, operadora } = req.body;

  if (!usuarioId || !numero || !tipo || !operadora) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  if (!db.usuarios.find(u => u.id === usuarioId)) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const id = db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id)) + 1 : 1;
  const cartao = { id, usuarioId, numero, tipo, operadora, saldo: 0.00, cotas: 0 };
  db.cartoes.push(cartao);
  saveDB();

  res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!', cartao });
});

// ------------------ Rota: listar cartões por CPF ------------------
app.get('/api/cartoes/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const usuario = db.usuarios.find(u => u.cpf === cpf);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const cartoes = db.cartoes.filter(c => c.usuarioId === usuario.id);
  res.json({ nome: usuario.nome, cartoes });
});

// ------------------ Rota: atualizar saldo ------------------
app.put('/api/cartoes/:id/saldo', (req, res) => {
  const cartaoId = parseInt(req.params.id, 10);
  const { saldo } = req.body;

  if (saldo === undefined) {
    return res.status(400).json({ erro: 'É necessário informar o valor do saldo' });
  }

  const cartao = db.cartoes.find(c => c.id === cartaoId);
  if (!cartao) {
    return res.status(404).json({ erro: 'Cartão não encontrado' });
  }

  cartao.saldo = parseFloat(saldo);
  saveDB();
  res.json({ mensagem: 'Saldo atualizado com sucesso!', cartao });
});

// ------------------ Iniciar servidor ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} (America/Sao_Paulo)`);
});
