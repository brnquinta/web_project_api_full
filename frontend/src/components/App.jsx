// estilos globais
import "../index.css";

// hooks do React
import { useEffect, useState } from "react";

// roteamento
import { Route, Routes, useNavigate } from "react-router-dom";

// rota protegida
import ProtectedRoute from "./protectedRouters/ProtectedRouters.jsx";

// componentes principais
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import Main from "./main/Main.jsx";

// serviços
import api from "../utils/api.js";
import auth from "../utils/auth.js";

// contextos
import CurrentUserContext from "../contexts/CurrentUserContext.js";

// autenticação
import { Register, Login } from "./register/Register.jsx";
import InfoTooltip from "./register/infoToolTip/InfoToolTip.jsx";

// imagens
import signupSucesso from "./../images/signupSucesso.png";
import signupFail from "./../images/signupFail.png";

// utilitários
import { getToken, setToken as setTokenUtil } from "../utils/token.js";

import Popup from "./main/components/popup/Popup.jsx"; 

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();


useEffect(()=> {
  if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token");

}, [token])




  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsCheckingAuth(false);
      return;
    }

    auth
      .getUserAuth(jwt)
      .then((res) => {
        const email = res?.data?.email ?? res?.email ?? "";

        setIsLoggedIn(true);

        setToken(jwt);

        return api.getUserInfo().then((userData) => {
          setCurrentUser({
             ...(userData?.data ?? userData),
            email,
          });
        });
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setToken(null);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  useEffect(() => {
    api
      .getCardList()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.error(err));
  }, []);

  function handleAddPlaceSubmit(data) {
    return api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleEditProfileSubmit(data) {
    api
      .editProfileinfo(data.name, data.about)
      .then((updated) => {
        setCurrentUser(updated);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleEditAvatar(data) {
    api
      .editProfileAvatar(data.link)
      .then((updated) => {
        setCurrentUser(updated);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((individualCard) => individualCard._id !== card._id)
        );
      })
      .catch((err) => console.error(err));
  }

  function signOut() {
    localStorage.removeItem("token");
    setToken(null); 
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  }

  // Popups
  const handleOpenPopup = (popupData) => setPopup(popupData);
  const handleClosePopup = () => setPopup(null);

  // Cadastro
  function handleRegistration({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setPopup({
          title: "", // ✅ MUDOU: agora popup é OBJETO (igual o Main espera)
          children: (
            <InfoTooltip
              icon={signupSucesso}
              message="Cadastro realizado com sucesso."
            />
          ),
        });
        navigate("/signin");
      })
      .catch((err) => {
        setPopup({
          title: "", // ✅ MUDOU: agora popup é OBJETO (igual o Main espera)
          children: (
            <InfoTooltip
              icon={signupFail}
              message="Não foi possível concluir o cadastro. Tente novamente."
            />
          ),
        });
        console.error(err);
      });
  }

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
   
      .then((response) => {
  const token = response.token ?? response.data?.token;

  setToken(token);
  localStorage.setItem("token", token);
  setIsLoggedIn(true);

  return api.getUserInfo().then((userData) => {
    setCurrentUser({ ...(userData?.data ?? userData), email });
    navigate("/");
  });
})
      .catch((err) => {
        setPopup({
          title: "", // ✅ MUDOU: agora popup é OBJETO (igual o Main espera)
          children: <InfoTooltip icon={signupFail} message="Erro ao logar!" />,
        });
        console.error(err);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isCheckingAuth,
        signOut,
        handleAddPlaceSubmit,
        handleEditProfileSubmit,
        handleEditAvatar,
      }}
    >
      <div className="page">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      
{popup && (
  <Popup
    title={popup.title}
    onClose={handleClosePopup}
    isImagePopup={popup.isImagePopup}
  >
    {popup.children}
  </Popup>
)}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
