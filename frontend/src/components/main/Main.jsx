import editIcon from "../../images/edit-icon.png";
import barraIcon from "../../images/barra.png";
import plusIcon from "../../images/plus.png";
import { useContext } from "react";
import EditProfilePopup from "./components/popup/editProfile/EditProfile.jsx";
import NewCardPopup from "./components/popup/newCard/NewCard.jsx";
import EditAvatarPopup from "./components/popup/editAvatar/EditAvatar.jsx";
import ImagePopup from "./components/popup/imagePopup/ImagePopup.jsx";
import Card from "./components/card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const Main = ({ 
  cards, 
  onCardLike, 
  onCardDelete, 
  onOpenPopup, 
  onClosePopup 
}) => {

  const { currentUser } = useContext(CurrentUserContext);

  // Popup do Editar Perfil
  const editProfilePopup = { 
    title: "Editar Perfil", 
    children: <EditProfilePopup /> 
  };

  // Popup de Novo Card
  const newCardPopup = {
    title: "Novo local",
    children: <NewCardPopup /> 
  };

 // Popup de Editar Avatar
const editAvatarPopup = {
  title: "Alterar a foto de perfil",
  children: <EditAvatarPopup />
};


  // Popup de Imagem ao clicar no card
  const handleCardClick = (card) => {
    const imagePopup = {
      isImagePopup: true,
      children: <ImagePopup card={card} onClose={onClosePopup} />
    };

    onOpenPopup(imagePopup);
  };

  return (
    <>
      <div className="profile">
        <div className="profile__content">
          <div className="profile__picture-container">
            <img
              className="profile__edit-avatar-icon"
              src={editIcon}
              alt="profile edit-icon"
            />
            <img
              className="profile__picture"
              src={currentUser.avatar}
              alt="profile picture"
              onClick={() => onOpenPopup(editAvatarPopup)}
            />
          </div>

          <div className="profile__info">
            <div className="profile__button-content">

              <div className="profile__wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>

              <button
                className="profile__button-edit"
                onClick={() => onOpenPopup(editProfilePopup)}
              >
                <img
                  className="profile__button-edit-icon"
                  src={barraIcon}
                  alt="icone barra"
                />
              </button>
              </div>
            </div>

            <h2 className="profile__profession">{currentUser.about}</h2>
          </div>

          <button 
            className="profile__button-add"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            <img
              className="profile__add-icon"
              src={plusIcon}
              alt="icone adição"
            />
          </button>
        </div>
      </div>

      {/* Lista de Cards */}
      <ul className="cards__list">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            card={card}  
            onCardClick={handleCardClick} 
            handleCardLike={onCardLike} 
            handleCardDelete={onCardDelete} 
          />
        ))}
      </ul>

    </>
  );
}

export default Main;
