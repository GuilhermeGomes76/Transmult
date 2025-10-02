const express = require('express')
const cors = require('cors')
const fs = require('fs')
const CryptoJS = require('crypto-js')

const app = express()
app.use(cors())
app.use(express.json()) // já substitui body-parser

const dbFile = 'cartoes.json'
let db = {
    usuarios: [],
    cartoes: []
}

// Carregar banco de dados
function loadDB() {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf8')
        db = JSON.parse(data)
    } else {
        db.usuarios = []
        db.cartoes = []
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2))
    }
}

loadDB()

// Salvar banco de dados
function saveDB() {
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2))
}

// ----------------- Cadastro de usuário -----------------
// Cadastro de usuário
app.post('/api/cadastro', (req, res) => {
    const { nome, cpf, senha } = req.body;

    if (!nome || !cpf || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    if (db.usuarios.find(u => u.cpf === cpf)) {
        return res.status(400).json({ erro: 'CPF já cadastrado' });
    }

    const senhaHash = CryptoJS.SHA256(senha).toString();
    const id = db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;

    db.usuarios.push({ id, nome, cpf, senhaHash });

    // Criar automaticamente um cartão para o usuário com saldo 0
    const cartaoId = db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id)) + 1 : 1;
    const cartao = { 
        id: cartaoId, 
        usuarioId: id, 
        numero: `0000-0000-${cartaoId}`, 
        tipo: 'Padrão', 
        operadora: 'TransMult', 
        saldo: 0.00, 
        cotas: 0 
    };
    db.cartoes.push(cartao);

    saveDB();

    res.status(201).json({ mensagem: 'Usuário e cartão cadastrados com sucesso!' });
});


// ----------------- Login -----------------
app.post('/api/login', (req, res) => {
    const { nome, cpf, senha } = req.body

    if (!nome || !cpf || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
    }

    const senhaHash = CryptoJS.SHA256(senha).toString()
    const usuario = db.usuarios.find(u => u.nome === nome && u.cpf === cpf && u.senhaHash === senhaHash)

    if (usuario) {
        // Busca os cartões do usuário
        let cartoes = db.cartoes.filter(c => c.usuarioId === usuario.id)

        // Se não houver cartão, cria um cartão inicial com saldo 0
        if (cartoes.length === 0) {
            const cartaoInicial = {
                id: db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id)) + 1 : 1,
                usuarioId: usuario.id,
                numero: `0000-0000-0000-${String(usuario.id).padStart(4, '0')}`,
                tipo: 'Inicial',
                operadora: 'Banco Exemplo',
                saldo: 0.00,
                cotas: 0
            }
            db.cartoes.push(cartaoInicial)
            saveDB()
            cartoes.push(cartaoInicial)
        }

        res.json({
            mensagem: 'Login bem-sucedido!',
            usuario: { id: usuario.id, nome: usuario.nome, cpf: usuario.cpf },
            cartoes
        })
    } else {
        res.status(401).json({ erro: 'Credenciais inválidas' })
    }
})

// ----------------- Cadastro de cartão -----------------
app.post('/api/cartoes', (req, res) => {
    const { usuarioId, numero, tipo, operadora } = req.body

    if (!usuarioId || !numero || !tipo || !operadora) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
    }

    if (!db.usuarios.find(u => u.id === usuarioId)) {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    const id = db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id)) + 1 : 1

    const cartao = { id, usuarioId, numero, tipo, operadora, saldo: 0.00, cotas: 0 }
    db.cartoes.push(cartao)
    saveDB()

    res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!', cartao })
})

// ----------------- Listar cartões de um usuário pelo CPF -----------------
app.get('/api/cartoes/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const usuario = db.usuarios.find(u => u.cpf === cpf)

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    const cartoes = db.cartoes.filter(c => c.usuarioId === usuario.id)
    res.json({ nome: usuario.nome, cartoes })
})

// ----------------- Atualizar saldo de um cartão -----------------
app.put('/api/cartoes/:id/saldo', (req, res) => {
    const cartaoId = parseInt(req.params.id)
    const { saldo } = req.body

    if (saldo === undefined) {
        return res.status(400).json({ erro: 'É necessário informar o valor do saldo' })
    }

    const cartao = db.cartoes.find(c => c.id === cartaoId)

    if (!cartao) {
        return res.status(404).json({ erro: 'Cartão não encontrado' })
    }

    cartao.saldo = parseFloat(saldo)
    saveDB()

    res.json({ mensagem: 'Saldo atualizado com sucesso!', cartao })
})

// ----------------- Inicializar servidor -----------------
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} às ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`)
})
