import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function NewCard() {
  const userContext = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const {handleAddPlaceSubmit} = userContext
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({name,link})
  }
  return (
    <form className="form form-add" onSubmit={handleSubmit}>
      
      <div className="form__input-wrapper">
        <input
          className="form__item form__place"
          placeholder="Nome"
          minLength="2"
          maxLength="30"
          type="text"
          name="place"
          required
          onChange={(event) => setName(event.target.value)}
          
        />
        <span className="form__validation form__name-validation"></span>
      </div>

      <div className="form__input-wrapper">
        <input
          className="form__item form__url"
          placeholder="Link"
          type="url"
          name="url"
          required
          onChange={(event) => setLink(event.target.value)}
        />
        <span className="form__validation form__url-validation"></span>
      </div>

      <button className="form__button-submit" type="submit">
        Criar
      </button>

    </form>
  );
}

export default NewCard;
