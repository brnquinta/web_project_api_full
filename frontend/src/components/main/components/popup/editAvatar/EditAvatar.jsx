import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar() {
    const userContext = useContext(CurrentUserContext)
    const [link, setLink] = useState('')
    const { handleEditAvatar} = userContext

const handleSubmit = (event) => {
    event.preventDefault();
    handleEditAvatar({link})
  }

return ( 

<form className="form form-avatar" onSubmit={handleSubmit}>

    <div className="form__input-wrapper">
        <input
            className="form__item form__url"
            placeholder="Link"
            type="url"
            id="url"
            name="url"
            required
          
            onChange={(event) => setLink(event.target.value)}          
        />
        <span className="form__validation form__name-validation"></span>
      </div>
 <button className="form__button-submit" type="submit">
        Enviar
</button>


</form>
)





}

export default EditAvatar;