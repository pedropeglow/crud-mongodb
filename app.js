const express = require('express');
const { default: mongoose } = require('mongoose');
const rotaPet = require('./rotas/pet_rotas')
const rotaLogin = require('./rotas/login_rotas')
const rotaUsuario = require('./rotas/usuario_rotas')
const loginMiddleware = require('./middleware/login_middleware')
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const app = express();
const PORTA = 3000;

const trataLog = (req, res, next)=>{
    console.log("Metodo: ", req.method)
    console.log("URI:", req.originalUrl)
    next();
 }

	

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configuração da conexão com o Mongo
mongoose.connect('mongodb+srv://pedropeglowm:123@cluster0.wsvjrcp.mongodb.net/app_pet')
    .then(() => {
        console.log("Conectado ao MongoDB..");
    }).catch((error) => {
        console.log("Erro:", error)
    });


app.use(trataLog);

app.use('/api/pets',loginMiddleware.verifyJWT, rotaPet);
app.use('/api/login', rotaLogin);
app.use('/api/usuarios', rotaUsuario);

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})