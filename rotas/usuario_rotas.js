const express = require('express');
const usuarioController = require('../controller/usuario_controller');

const router = express.Router();


router.get("/", usuarioController.listar);

router.get("/busca", usuarioController.buscarUsuario)

router.get("/:id", usuarioController.buscarPorId)

router.post("/", usuarioController.inserir)

router.put("/:id", usuarioController.atualizar)

router.delete("/:id", usuarioController.deletar)

module.exports = router;