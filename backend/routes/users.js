

const {validateSignup, validateLogin} = require('../middlewares/validator.js')
const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

//  Informações do usuário
router.get('/me', getCurrentUser);

// Atualizações do usuário atual
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

// Lista geral de usuários
router.get('/', getUsers);

// Rota dinâmica por ID
router.get('/:id', getUserById);

module.exports = router;