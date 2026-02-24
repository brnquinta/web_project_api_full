import SignForm from "./signForm/SignForm";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function Register({ handleRegistration }) {
  return (
    <div className="register">
      <SignForm
        name="register"
        title="Inscrever-se"
        onSubmit={handleRegistration}
      />
      <Link className="register__signin-link" to="/signin">
        Já é um membro? Faça o login aqui!
      </Link>
    </div>
  );
}

export function Login({ handleLogin }) {
  return (
    <div className="login">
      <SignForm
        name="login"
        title="Entrar"
        onSubmit={handleLogin}
      />
      <Link className="login__signup-link " to="/signup">
        Não tem conta? Cadastre-se
      </Link>
    </div>
  );
}

Register.propTypes = {
  handleRegistration: PropTypes.func,
};

Login.propTypes = {
  handleLogin: PropTypes.func,
};
