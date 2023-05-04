const express = require('express');
const pet = require('../controller/pet_controller');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const router = express.Router();

//Rota do recurso: '/api/produtos'

router.get("/", pet.listar);

router.get("/:id", pet.buscarPorId)

router.post("/", pet.inserir)

router.put("/:id", pet.atualizar)

router.delete("/:id", pet.deletar)

module.exports = router;