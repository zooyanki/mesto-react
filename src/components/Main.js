import React, {useState, useEffect, useContext} from 'react';
import editAvatarButtom from '../images/update_avatar.svg';
import {api} from '../Utils/api';
import Card from './Card';
import {currentUserContext, cardContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(currentUserContext);
    const cards = useContext(cardContext);
    
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

    const handleCardDelete = (card) => {
      const isOwn = card.owner._id === currentUser[0]._id;

      // if (!isOWn) {api.delInitialCards(card._id).then((delCard) => {
      //     const delCard = cards[]
      // })}
    }

    return (
          <main>
            <section className="profile block-width">
                <div className="profile__avatar-container">
                  <img src={currentUser[0] && currentUser[0].avatar} className="profile__avatar" alt="Аватар_пользователя" />
                  <div className="profile__overlay">
                    <div className="profile__overlay-background"></div>
                    <img src={editAvatarButtom} alt="Изменение аватара" className="profile__updateavatar" onClick={props.onEditAvatar}/>
                  </div>
                </div>
                <div className="profile__info">
                  <h1 className="profile__name">{currentUser[0] && currentUser[0].name}</h1>
                  <button className="profile__edit-button" type="button" aria-label="Edit_profile" onClick={props.onEditProfile}></button>
                  <h2 className="profile__status">{currentUser[0] && currentUser[0].about}</h2>
                </div>
                <button className="profile__add-button" type="button" aria-label="Add_profile" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements block-width">
              {cards[0].map((card, i) => <Card image={card} key={i} onCardClick={props.onCardClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike}/>)}          
            </section>             
          </main>
    );

  }

export default Main;