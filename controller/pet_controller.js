const Pet = require("../model/pet");
const Usuario = require("../model/usuario");


exports.listar = async (req, res, next) => { 
    try{
        
        const pets = await Pet.find().populate('usuario');
        res.status(200).json(pets);
    }
    catch(err) {
        res.status(500).json({Erro:err});
    }
}

exports.buscarPorId = async (req, res) => { 
    const id = req.params.id;

    try{ 

        const petEncontrado = await Pet.findById(id);
        if(petEncontrado){ 
            return res.status(200).json(petEncontrado);
        }
        else {
            return res.status(404).json({ Erro: "Pet não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            
}

exports.inserir = async (req, res) => { 
    const petRequest = req.body;
    if(petRequest && petRequest.nome && petRequest.idade && petRequest.tipo && petRequest.usuario){
        const usuario = await Usuario.findById(petRequest.usuario);
        console.log(usuario)
        const petNovo = new Pet(petRequest);

        try{ 
            
            const petSalvo = await petNovo.save();
            return res.status(201).json(petSalvo);
        }
        catch(err) { 
            res.status(500).json({Erro:err});
        }
    }
    else{
        return res.status(400).json({
            Erro: "Nome, tipo e/ou idade sao obrigatorios"
        });
    }
}

exports.atualizar = async (req, res) => { 
    const id = req.params.id;
    const petAlterar = req.body;

    if(!petAlterar.nome && !petAlterar.idade && !petAlterar.tipo){
        return res.status(400).json({
            Erro: "Nome, tipo e/ou idade sao obrigatorios"
        });
    }
    try{ 
        const petAtualizado = await Pet.findByIdAndUpdate(id, petAlterar, {new: true});
        if(petAtualizado){ 
            return res.status(200).json(petAtualizado);
        }
        else {
            return res.status(404).json({ Erro: "Pet nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.deletar = async (req, res) => { 
    const id = req.params.id;

    try{ 
        const petADeletado = await Pet.findByIdAndDelete(id);
        if(petADeletado){ 
            return res.status(200).json(petADeletado);
        }
        else {
            return res.status(404).json({ Erro: "Pet nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}
