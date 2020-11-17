import React from "react";
import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    


    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="updateavatar" title="Обновите аватар" buttonText="Сохранить">             
            <label className="modal__label">
                <input className="modal__field modal__field_updateavatar" id="input-updateavatar-url" defaultValue="" name="avatar" placeholder="Ссылка на аватар" type="url" required/>
                <span className="modal__input-error" id="input-updateavatar-url-error"></span>
            </label>            
        </PopupWithForm>
    )
}

export default EditAvatarPopup;