import logo from "../../images/Vector.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { isLoggedIn, currentUser, signOut } = useContext(CurrentUserContext);
  const location = useLocation();

  let headerRight = null;

  // Signup -> mostra link para login
  if (location.pathname === "/signup") {
    headerRight = (
      <div className="header__nav">
        <Link className="header__link" to="/signin">
          Faça o login
        </Link>
      </div>
    );
  }
  // Signin -> mostra link para cadastro
  else if (location.pathname === "/signin") {
    headerRight = (
      <div className="header__nav">
        <Link className="header__link" to="/signup">
          Cadastre-se
        </Link>
      </div>
    );
  }
  // Logado -> mostra email + sair
  else if (isLoggedIn) {
    headerRight = (
      <ul className="header__nav header__nav_list">
        <li className="header__email">{currentUser?.email ?? ""}</li>
        <li>
          <Link
            className="header__link header__link_signout"
            to="/signin"
            onClick={signOut}
          >
            Sair
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="logo around" />
        {headerRight}
      </div>
    </header>
  );
}

export default Header;
