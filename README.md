# Link para acesso

https://aroundfrontend-nine.vercel.app/


# 🚀 Web Project API Full

Aplicação Full Stack desenvolvida com Node.js + Express + MongoDB Atlas no backend e React (Vite) no frontend.

O projeto implementa autenticação com JWT, proteção de rotas e operações CRUD integradas a um banco de dados em nuvem (MongoDB Atlas). A arquitetura é separada entre cliente e servidor.

---

## 🧱 Estrutura do Projeto

backend/  
frontend/

- backend → API REST com autenticação e integração com banco de dados
- frontend → Interface React que consome a API

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Celebrate / Joi (validação)
- JSON Web Token (JWT)
- Bcryptjs (hash de senha)
- Winston (logs)
- ESLint

### Frontend
- React
- React Router DOM
- Vite
- Prop Types
- ESLint

---

## 🔐 Funcionalidades

- Cadastro de usuário (Signup)
- Login com autenticação JWT
- Proteção de rotas privadas
- CRUD de usuários
- CRUD de cards
- Validação de dados no backend
- Tratamento centralizado de erros
- Logs de requisições e erros
- Integração com MongoDB Atlas

---

## ⚙️ Variáveis de Ambiente

O backend utiliza variáveis de ambiente para configuração segura.

Crie um arquivo `.env` dentro da pasta `backend/` com:

MONGO_URI=<sua_string_de_conexao_mongodb>

Em produção (Render), configure a variável em:
Environment → Add Environment Variable

---

## ▶️ Como Rodar Localmente

### Backend

cd backend  
npm install  
npm run dev  

Ou em produção:

npm start  

---

### Frontend

cd frontend  
npm install  
npm run dev  

Para gerar build:

npm run build  

---

## 🌍 Deploy

- Backend hospedado no Render
- Banco de dados no MongoDB Atlas
- Frontend servido via build estático

O backend utiliza:

process.env.PORT

para compatibilidade com ambientes de produção.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e prática de desenvolvimento Full Stack.