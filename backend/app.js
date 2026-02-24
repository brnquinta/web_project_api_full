require('dotenv').config();
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("RAW:", JSON.stringify(process.env.MONGO_URI));
console.log("PREFIXO:", process.env.MONGO_URI?.slice(0, 20));
const path = require("path");
const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorMiddleware = require('./middlewares/error')
const {validateSignup, validateLogin} = require('./middlewares/validator.js')
const { requestLogger,errorLogger } = require('./middlewares/logger.js');

const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
/* registro de log */
app.use(requestLogger)


/* Rotas públicas */
app.post('/signin', validateLogin, login);
app.post('/signup', validateSignup, createUser);

/* Conexão BD */


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('conectado ao BD'))
  .catch((err) => console.error('erro ao conectar no BD', err));

/* Rotas protegidas (por enquanto ainda sem auth middleware) */
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

/* 404 */
app.use((req, res, next) => {
  const err = new Error('A solicitação não foi encontrada');
  err.statusCode = 404;
  next(err);
});

/* Validadores */

app.use(errors()); 
app.use(errorLogger)    // Registro de erros  
app.use(errorMiddleware); 


/* build FrontEnd */

app.use(express.static(path.join(__dirname, "..", "frontend")));

/* Start */
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});