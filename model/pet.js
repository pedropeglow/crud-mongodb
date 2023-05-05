const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    idade: Number,
}, {
    versionKey: false
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;