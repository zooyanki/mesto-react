import React, { useState, useEffect, Component } from 'react';
import editAvatarButtom from '../images/update_avatar.svg';
import {api} from '../Utils/api';
import Card from './Card';

function Main(props) {
 
    const userName = useState();
    const userDescription = useState();
    const userAvatar = useState();
    const cards = useState([]);
    
    useEffect(()=>{
      api.getUserInfo().then((userInfo)=>{
        userAvatar[1](userInfo.avatar);
        userName[1](userInfo.name);
        userDescription[1](userInfo.about);
      })
      api.getInitialCards().then((item) => {
        cards[1](item);
      })
    },[])


    return (
        <>
          <main>
            <section className="profile block-width">
                <div className="profile__avatar-container">
                  <img src={userAvatar[0]} className="profile__avatar" alt="Аватар_пользователя" />
                  <div className="profile__overlay">
                    <div className="profile__overlay-background"></div>
                    <img src={editAvatarButtom} className="profile__updateavatar" onClick={props.onEditAvatar}/>
                  </div>
                </div>
                <div className="profile__info">
                  <h1 className="profile__name">{userName[0]}</h1>
                  <button className="profile__edit-button" type="button" aria-label="Edit_profile" onClick={props.onEditProfile}></button>
                  <h2 className="profile__status">{userDescription[0]}</h2>
                </div>
                <button className="profile__add-button" type="button" aria-label="Add_profile" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements block-width">
            {cards[0].map((card, i) => <Card image={card} key={i} onCardClick={props.onCardClick}/>)}          
            </section>             
          </main>
          
        </>
    );

  }

    





export default Main;