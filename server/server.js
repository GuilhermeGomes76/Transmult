const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const CryptoJS = require('crypto-js')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const dbFile = 'cartoes.json'
let db = {
    usuarios : [],
    cartoes : []
}

function loadDB(){
    if(fs.existsSync(dbFile)){
        const data = fs.readFileSync(dbFile, 'utf8')
        db = JSON.parse(data)
    }else{
        db.usuarios = []
        db.cartoes = []
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2))
    }
}

loadDB()

function saveDB(){
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2))
}
//login
app.post('/api/cadastro', (req, res) => {
    const{nome, cpf, senha} = req.body
    const senhaHash = CryptoJS.SHA256(senha).toString()
    const id = db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1:1

    if(!nome || !cpf || !senha){
        return res.status(400).json({erro: 'Todos os campos são obrigatórios'})
    }
    if(db.usuarios.find(u => u.cpf === cpf)){
        return res.status(400).json({erro: 'CPF já cadastado'})
    }
    db.usuarios.push({id, nome, cpf, senhaHash})
    saveDB()
    res.status(201).json({mensagem: 'Usuário cadastrado com sucesso'})
})

//cadastro de cartão(simulando a associação pós cadastro)
app.post('/api/login', (req, res) => {
    const {nome, cpf, senha} = req.body
    const senhaHash = CryptoJS.SHA256(senha).toString()
    const usuario = db.usuarios.find(u => u.nome === nome && u.cpf === cpf && u.senhaHash === senhaHash)

    if(!nome || !cpf || !senha){
        return res.status(400).json({erro: 'Todos os campos são obrigatórios'})
    }
    if(usuario){
        const cartoes = db.cartoes.filter(c => c.usuárioId === usuario.id)
        res.json({mensagem: 'Login bem-sucedido!', usuario: {id: usuario.id, nome: usuario.nome, cpf: usuario.cpf}, cartoes})
    }else{
        res.status(401).json({erro: 'Credenciais inválidas'})
    }
})


app.post('/api/cartoes', (req, res) => {
    const{usuarioId, numero, tipo, operadora} = req.body
    id = db.cartoes.length ? Math.max(...db.cartoes.map(c => c.id))+1:1

    if(!usuarioId || !numero || !tipo || !operadora){
        return res.status(400).json({erro: 'Todos os campos são obrigatórios'})
    }
    if(!db.usuarios.find(u => u.id === usuarioId)){
        return res.status(404).json({erro: 'Usuário não encontrado'})
    }

    db.cartoes.push({id, usuarioId, numero, tipo, operadora, saldo: 0.00, cotas: 0 })
    saveDB()
    res.status(201).json({mensagem: 'Cartão cadastrado com sucesso!', cartao: db.cartoes.find(c => c.id === id)})
})

app.get('/api/cartoes/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const usuario = db.usuarios.find(u => u.cpf === cpf)
    if(!usuario){
        return res.status(404).json({erro: 'Usuário não encontrado'})
    }
    const cartoes = db.cartoes.filter(c => c.usuarioId === usuario.id)
    res.json({nome: usuario.nome, cartoes})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} às ${new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}`)
})
