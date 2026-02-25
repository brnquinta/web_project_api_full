require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");

const auth = require("./middlewares/auth");
const errorMiddleware = require("./middlewares/error");
const { validateSignup, validateLogin } = require("./middlewares/validator.js");
const { requestLogger, errorLogger } = require("./middlewares/logger.js");

const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());

/* registro de log */
app.use(requestLogger);

/* crash-test */
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

/* CORS */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://aroundfrontend-nine.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* Preflight global */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

/* Conexão BD */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("conectado ao BD"))
  .catch((err) => console.error("erro ao conectar no BD", err));

/* Rotas públicas */
app.post("/signin", validateLogin, login);
app.post("/signup", validateSignup, createUser);

/* Rotas protegidas */
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);


/* 404 */
app.use((req, res, next) => {
  const err = new Error("A solicitação não foi encontrada");
  err.statusCode = 404;
  next(err);
});

/* Validadores / erros */
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

/* Start */
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});