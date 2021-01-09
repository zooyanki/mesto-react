import React from 'react';

export const enter = {
    register: {
        link: '/signin',
        text: 'Войти'
    },
    login: {
        link: '/signup', 
        text: 'Регистрация'
    }
}

export const EnterContext = React.createContext();