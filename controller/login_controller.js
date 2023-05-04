require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const Usuario = require("../model/usuario");
const bcrypt = require('bcrypt');



exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await Usuario.findOne({ email: email });
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválido' });
    }

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (result) {
        const id = user.id;
        const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token: token });
      } else {
        return res.status(401).json({ message: 'Nome de usuário ou senha inválido' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
}