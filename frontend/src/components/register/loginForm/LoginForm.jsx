import { useState } from "react";
import PropTypes from "prop-types";


export default function LoginForm(props) {
  const { name, title, onSubmit } = props;

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const formClass = `form form__login form__${name}`;

  return (
    <form className={formClass} name={name} onSubmit={handleSubmit}>
      <input className="form__input form__input_login"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />

      <input className="form__input orm__input_login"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />

      <button className="button__submit button__submit_login" type="submit">Enviar</button>
    </form>
  );
}

SignForm.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
