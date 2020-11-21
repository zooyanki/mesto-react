// import './index.css';
import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmPopup from './ConfirmPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../Utils/api';
import {CurrentUserContext, CardContext} from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [targetCard, setTargetCard] = useState();


  useEffect(()=>{
    api.getUserInfo().then((userInfo)=>{
      setCurrentUser(userInfo);
      }).catch((err) =>
        console.log("Упс... что-то пошло не так"));

    api.getInitialCards().then((item) => {
        setCards(item);
        }).catch((err) =>
          console.log("Упс... что-то пошло не так"));
  },[])

  //Удаление карты
  const handleCardDelete = () => {
    console.log(targetCard);
    api.delInitialCards(targetCard._id).then(() => {
      const newCards = cards.filter(item => item._id !== targetCard._id);
      setCards(newCards);
      }).catch((err) =>
      console.log("Упс... что-то пошло не так"));
    }

  const handleCardLike = (card) => {
      const isLiked = card.likes.some(item => item._id === currentUser._id);
      
      if (!isLiked) {api.addLikeCard(card._id).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        }).catch((err) =>
        console.log("Упс... что-то пошло не так"));
      } else {
        api.remLikeCard(card._id).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards)
        }).catch((err) =>
        console.log("Упс... что-то пошло не так"));
      }
    } 
      
  const handleUpdateUser = (infoUser) => {
    api.setUserInfo(infoUser.name, infoUser.about).then((name, about)=> {
      setCurrentUser(name, about);
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }

  const handleUpdateAvatar = (avatar) => {
    api.setUserAvatar(avatar.avatar).then((a) => {
      setCurrentUser(a);
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }

  const handleAddPlaceSubmit = (image) => {
    api.setInitialCard(image.name, image.link).then((newCard) => {
      console.log(newCard);
      setCards([newCard, ...cards])
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }
  

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  } 
  
  const openPopupEditor = () => {
    setisEditProfilePopupOpen(true);
  }
  const openPopupNewForm = () => {
    setisAddPlacePopupOpen(true);
  }
  const openPopupAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const openPopupConfirm = (card) => {
    setIsConfirmPopupOpen(true);
    setTargetCard(card);
  }

  const closeAllPopups = () => {
    setisAddPlacePopupOpen(false);
    setisEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
      <div className="App">
      
        <div className="content">
              <Header/>                
              <Main cards={cards} onConfirmPopup={openPopupConfirm} onEditProfile={openPopupEditor} onAddPlace={openPopupNewForm} onEditAvatar={openPopupAvatar} onCardClick={handleCardClick} onCardLike={handleCardLike}/>
              <Footer/>
        </div>

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
       
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                  
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            
            <ConfirmPopup onClose={closeAllPopups} isOpen={isConfirmPopupOpen} onCardDelete={handleCardDelete}/>             

            <ImagePopup onClose={closeAllPopups} isOpen={selectedCard} />
              
      </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>  
  );

}

export default App;


