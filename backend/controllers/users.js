const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');



// GET /users
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Erro no servidor' });
  }
};

// GET /users/:id
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .orFail(); // 🔹 MUDANÇA: orFail para erro automático se não existir

    res.send(user);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }

    return res.status(500).send({ message: 'Erro no servidor' });
  }
};




// POST /signup
module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    // gerar hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword
    });

    res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Erro de validação' });
    }

    if (err.code === 11000) {
      return res.status(409).send({ message: 'Não foi possível criar o usuário' });
    }

    return res.status(500).send({ message: 'Erro no servidor' });
  }
};

// Patch /users/me

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { name, about },
      { new: true, runValidators: true }
    ).orFail(); // 🔹 garante 404 se não existir

    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Dados inválidos' });
    }
    return res.status(500).send({ message: 'Erro no servidor' });
  }
};

//PATCH /users/me/avatar
module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id, 
      { avatar },
      { new: true, runValidators: true }
    ).orFail(); // 🔹 garante 404 se não existir

    res.send(updatedUserAvatar);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Dados inválidos' });
    }
    return res.status(500).send({ message: 'Erro no servidor' });
  }
};



// login

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuário incluindo o password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).send({ message: 'Email ou senha incorretos' });
    }

    // comparar senha
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).send({ message: 'Email ou senha incorretos' });
    }

    // criar token
    const token = jwt.sign(
      { _id: user._id }, // payload 
      'dev-secret',      // para testes
      { expiresIn: '7d' }
    );

    // enviar token no corpo da resposta
    return res.send({ token });

  } catch (err) {
    return res.status(500).send({ message: 'Erro no servidor' });
  }
};



module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail();

    res.send(user);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    return res.status(500).send({ message: 'Erro no servidor' });
  }
};