// import './index.css';
import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../Utils/api';
import {CurrentUserContext, CardContext} from '../contexts/CurrentUserContext';

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

  const handleCardDelete = (card) => {
    api.delInitialCards(card._id).then(() => {
      const newCards = cards[0].filter(item => item._id !== card._id);
      cards[1](newCards);
      }).catch((err) =>
      console.log("Упс... что-то пошло не так"));
    }

  const handleCardLike = (card) => {
      const isLiked = card.likes.some(item => item._id === currentUser[0]._id);
      
      if (!isLiked) {api.addLikeCard(card._id).then((newCard) => {
          const newCards = cards[0].map((c) => c._id === card._id ? newCard : c);
          cards[1](newCards);
      })} else {
        api.remLikeCard(card._id).then((newCard) => {
          const newCards = cards[0].map((c) => c._id === card._id ? newCard : c);
          cards[1](newCards)
        })}
    } 
    
    
  const handleUpdateUser = (infoUser) => {
    api.setUserInfo(infoUser.name, infoUser.about).then((name, about)=> {
      currentUser[1](name, about);
    })
  }

  const handleUpdateAvatar = (avatar) => {

    api.setUserAvatar(avatar.avatar).then((a) => {
      currentUser[1](a);
    })
  }

  const handleAddPlaceSubmit = (image) => {
    api.setInitialCard(image.name, image.link).then((newCard) => {
      console.log(newCard);
      cards[1]([newCard, ...cards[0]])
    })
  }
  

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
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
      <div className="App">
      
        <div className="content">
              <Header/>                
              <Main cards={cards} onEditProfile={openPopupEditor} onAddPlace={openPopupNewForm} onEditAvatar={openPopupAvatar} onCardClick={handleCardClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike}/>
              <Footer/>
        </div>

            <AddPlacePopup isOpen={isAddPlacePopupOpen[0]} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
       
            <EditProfilePopup isOpen={isEditProfilePopupOpen[0]} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                  
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen[0]} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            
            <PopupWithForm onClose={closeAllPopups} name="confirmpopup" title="Вы уверены?" buttonText="Да"/>             

            <ImagePopup onClose={closeAllPopups} isOpen={selectedCard[0]} />
              
      </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>  
  );

}

export default App;


