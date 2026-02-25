const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
 
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30

  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Link deve ser uma URL válida',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },

  email: {
    type: String, 
    required: true,
    unique: true,
    validate: {
    validator: (v) => validator.isEmail(v),
    message: 'Email deve ser válido'
  }
  }, 
  password: {
    type: String, 
    required: true, 
    select: false
  }

});

module.exports = mongoose.model('user', userSchema);
