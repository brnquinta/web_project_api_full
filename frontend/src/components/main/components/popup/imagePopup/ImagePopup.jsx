

function ImagePopup({ card }) {
  if (!card) return null;

  return (

        <div
          className="popup__content_content_image"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Imagem */}
          <img src={card.link} alt={card.name} className="popup__image" />

          {/* Caption (legenda) — deve aparecer automaticamente */}
          <h3 className="popup__image-title">{card.name}</h3>
        </div>
   
  );
}

export default ImagePopup;