import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";


function EditProfile() {
const userContext = useContext(CurrentUserContext)
const [name, setName] = useState('')
const [about, setAbout] = useState('')
const {handleEditProfileSubmit} = userContext

const handleSubmit = (event) => {
    event.preventDefault();
    handleEditProfileSubmit({name,about})
  }


  return (
    <form className="form form-profile " onSubmit={handleSubmit} >
      <div className="form__input-wrapper">
        <input
          className="form__item form__name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          type="text"
          name="name"
          required
           onChange={(event) => setName(event.target.value)}
        />
        <span className="form__validation form__name-validation"></span>
      </div>

      <div className="form__input-wrapper">
        <input
          className="form__item form__profession"
          placeholder="Profissão"
          minLength="2"
          maxLength="200"
          type="text"
          name="about"
          required
           onChange={(event) => setAbout(event.target.value)}
        />
        <span className="form__validation form__profession-validation"></span>
      </div>

      <button className="form__button-submit" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default EditProfile;
