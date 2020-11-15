// import './index.css';
import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../Utils/api';
import {currentUserContext, cardContext} from '../contexts/CurrentUserContext';

function App() {
  const currentUser = useState();
  const cards = useState([]);
  const isEditProfilePopupOpen = useState(false);
  const isAddPlacePopupOpen = useState(false);
  const isEditAvatarPopupOpen = useState(false);
  const selectedCard = useState(false);
  

  useEffect(()=>{
    api.getUserInfo().then((userInfo)=>{
      currentUser[1](userInfo);
      }).catch((err) =>
        console.log("Упс... что-то пошло не так"));

    api.getInitialCards().then((item) => {
        cards[1](item);
        }).catch((err) =>
          console.log("Упс... что-то пошло не так"));
  },[])


  const handleCardClick = (card) => {
    selectedCard[1](card); 
  } 
  
  const openPopupEditor = () => {
    isEditProfilePopupOpen[1](true);
  }
  const openPopupNewForm = () => {
    isAddPlacePopupOpen[1](true);
  }
  const openPopupAvatar = () => {
    isEditAvatarPopupOpen[1](true);
  }

  const closeAllPopups = () => {
    isAddPlacePopupOpen[1](false);
    isEditProfilePopupOpen[1](false);
    isEditAvatarPopupOpen[1](false);
    selectedCard[1](false);
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <cardContext.Provider value={cards}>
      <div className="App">
      
        <div className="content">
              <Header/>                
              <Main onEditProfile={openPopupEditor} onAddPlace={openPopupNewForm} onEditAvatar={openPopupAvatar} onCardClick={handleCardClick}/>
              <Footer/>
        </div>

          <PopupWithForm isOpen={isAddPlacePopupOpen[0]} onClose={closeAllPopups} name="newform" title="Новое место" buttonText="Сохранить">
                <>            
                  <label className="modal__label">
                    <input className="modal__field modal__field_newform-name" id="input-newform-name" defaultValue="" name="name"  placeholder="Название" minLength="2" maxLength="30" type="text" required/>
                    <span className="modal__input-error" id="input-newform-name-error"></span>
                  </label>
                  <label className="modal__label">
                    <input className="modal__field modal__field_newform-link" id="input-newform-url" defaultValue="" name="link" placeholder="Ссылка на картинку" type="url" required/>
                    <span className="modal__input-error" id="input-newform-url-error"></span>
                  </label>
                </>
            </PopupWithForm>
            <PopupWithForm isOpen={isEditProfilePopupOpen[0]} onClose={closeAllPopups} name="editor" title="Редактировать профиль" buttonText="Сохранить">
                  <label className="modal__label">
                    <input className="modal__field modal__field_editor-name" id="input-editor-name" defaultValue="" name="name" type="text" placeholder="Введите ваше имя" minLength="2" maxLength="40" required/>
                    <span className="modal__input-error" id="input-editor-name-error"></span>
                  </label>
                  <label className="modal__label">
                    <input className="modal__field modal__field_editor-status" id="input-editor-status" defaultValue="" name="about" type="text" placeholder="Введите вашу профессию" minLength="2" maxLength="200" required/>
                    <span className="modal__input-error" id="input-editor-status-error"></span>
                  </label>          
            </PopupWithForm> 
            <PopupWithForm isOpen={isEditAvatarPopupOpen[0]} onClose={closeAllPopups} name="updateavatar" title="Обновите аватар" buttonText="Сохранить">             
                  <label className="modal__label">
                    <input className="modal__field modal__field_updateavatar" id="input-updateavatar-url" defaultValue="" name="avatar" placeholder="Ссылка на аватар" type="url" required/>
                    <span className="modal__input-error" id="input-updateavatar-url-error"></span>
                  </label>            
              </PopupWithForm>
              <PopupWithForm onClose={closeAllPopups} name="confirmpopup" title="Вы уверены?" buttonText="Да"/>             

            
              <ImagePopup onClose={closeAllPopups} isOpen={selectedCard[0]} />
              
      </div>
      </cardContext.Provider>
    </currentUserContext.Provider>  
  );

}

export default App;


