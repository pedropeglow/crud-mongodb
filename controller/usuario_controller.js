const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario");

exports.listar = async (req, res) => { 
    try{ 
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }
    catch(err) {
        res.status(500).json({Erro:err});
    }
}

exports.buscarPorId = async (req, res) => { 
    const id = req.params.id;

    try{ 

        let usuarioEncontrado = await Usuario.findById(id);
        if(usuarioEncontrado){ 
            const usuarioEncontradoSemSenha = Object.assign({}, {
                _id: usuarioEncontrado.id, 
                nome: usuarioEncontrado.nome, 
                email: usuarioEncontrado.email
            })
            return res.json(usuarioEncontradoSemSenha);
        }
        else {
            return res.status(404).json({ Erro: "Usuario nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            
}

exports.inserir = async (req, res) => { 
    const usuarioRequest = req.body;
    if(usuarioRequest && usuarioRequest.nome 
        && usuarioRequest.email && usuarioRequest.senha){
        const usuarioNovo = new Usuario(usuarioRequest);
        usuarioNovo.senha = await bcrypt.hash(usuarioRequest.senha, 10);

        try{ 
            const usuarioSalvo = await usuarioNovo.save();
            return res.status(201).json(usuarioSalvo);
        }
        catch(err) { 
            res.status(500).json({Erro:err});
        }
    }
    else{
        return res.status(400).json({
            Erro: "Nome, email e/ou senha sao obrigatorios"
        });
    }
}

exports.atualizar = async (req, res) => { 
    const id = req.params.id;
    const usuarioAlterar = req.body;

    if(!usuarioAlterar || !usuarioAlterar.nome 
        || !usuarioAlterar.email || !usuarioAlterar.senha){
        return res.status(400).json({
            Erro: "Nome, email e/ou senha sao obrigatorios"
        });
    }

    try{ 
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, usuarioAlterar, {new: true});
        if(usuarioAtualizado){ 
            const usuarioNovoHash = new Usuario(usuarioAtualizado);
            usuarioNovoHash.senha = await bcrypt.hash(usuarioAtualizado.senha, 10);
            return res.json(usuarioNovoHash);
        }
        else {
            return res.status(404).json({ Erro: "Usuario nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.deletar = async (req, res) => { 
    const id = req.params.id;

    try{ 
        const usuarioDeletado = await Usuario.findByIdAndDelete(id);
        if(usuarioDeletado){ 
            return res.json(usuarioDeletado);
        }
        else {
            return res.status(404).json({ Erro: "Usuario nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.buscarUsuario = async (req, res) => {
    if(req.query && req.query.email){
        try{ 
            let usuarioEncontrado = await Usuario.findOne({email: req.query.email});
            if(usuarioEncontrado){ 
                const usuarioEncontradoSemSenha = Object.assign({}, {
                    _id: usuarioEncontrado.id, 
                    nome: usuarioEncontrado.nome, 
                    email: usuarioEncontrado.email
                })
                return res.json(usuarioEncontradoSemSenha);
            }
            else {
                return res.status(404).json({ Erro: "Usuario nao encontrado"});
            }
        } catch(err) {
            res.status(500).json({Erro:err});
        }                    
    }
    else {
        res.status(400).json({Erro: "Faltou o parametro email"})
    }

}

