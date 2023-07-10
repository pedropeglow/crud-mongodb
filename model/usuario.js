const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
}, {
    versionKey: false
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;