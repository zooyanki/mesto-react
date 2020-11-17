import React, {useContext} from 'react';
import editAvatarButtom from '../images/update_avatar.svg';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext); 
    
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
              {props.cards[0].map((card, i) => <Card image={card} key={i} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike}/>)}          
            </section>             
          </main>
    );

  }

export default Main;