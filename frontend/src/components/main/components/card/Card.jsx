// Card.jsx

import likeIcon from "../../../../images/heart_icon.png";
import likeIconActive from "../../../../images/heart_icon_black.png";
import deleteIcon from "../../../../images/deleteIcon.svg";

export default function Card(props) {
  const { name, link, likes, owner } = props.card;

  const { handleCardLike, handleCardDelete, onCardClick, currentUserId } = props;

  const isLiked =
    Array.isArray(likes) &&
    likes.some((like) =>
      (typeof like === "string" ? like : like?._id) === currentUserId
    );

  const isOwn =
    (typeof owner === "string" ? owner : owner?._id) === currentUserId;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(props.card)}
      />

      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => handleCardDelete(props.card)}
        >
          <img
            src={deleteIcon}
            alt="Ícone de lixeira"
            className="card__trash-icon"
          />
        </button>
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(props.card, !isLiked)} // ToogleLike
        >
          <img
            src={isLiked ? likeIconActive : likeIcon}
            alt="Ícone de coração"
            className="card__like-icon"
          />
        </button>
      </div>
    </li>
  );
}