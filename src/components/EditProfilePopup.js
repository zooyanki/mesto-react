import React from "react";
import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const name = useState();
    const description = useState();

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        name[1](currentUser[0] && currentUser[0].name);
        description[1](currentUser[0] && currentUser[0].about);
      }, [currentUser[0]]); 

    const handleChangeName = (e) => {
        name[1](e.target.value);
    }

    const handleChangeDescription = (e) => {
        description[1](e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateUser({
            name: name[0],
            about: description[0]
          });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="editor" title="Редактировать профиль" buttonText="Сохранить">
                        <label className="modal__label">
                            <input className="modal__field modal__field_editor-name" value={name[0] || ' '} onChange={handleChangeName} id="input-editor-name" name="name" type="text" placeholder="Введите ваше имя" minLength="2" maxLength="40" required/>
                            <span className="modal__input-error" id="input-editor-name-error"></span>
                        </label>
                        <label className="modal__label">
                            <input className="modal__field modal__field_editor-status" value={description[0] || ' '} onChange={handleChangeDescription} id="input-editor-status" name="about" type="text" placeholder="Введите вашу профессию" minLength="2" maxLength="200" required/>
                            <span className="modal__input-error" id="input-editor-status-error"></span>
                        </label>          
        </PopupWithForm>) 
}

export default EditProfilePopup;