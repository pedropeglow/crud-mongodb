const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    idade: Number,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    versionKey: false
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;