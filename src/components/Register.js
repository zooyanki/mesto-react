import React, { useState } from 'react';

function Register (props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div className="sign">
            <h2 className="sign__header">Регистрация</h2>
            <input className="sign__input" value="E-mail" type="email"/>
            <input className="sign__input" value="Пароль" type="password"/>
            <button className="sign__buttonSubmit">Зарегистрировать</button>
            <h3 className="sign__text">Уже зарегистрированы? <a className="sign__enterlink" href="/signin">Войти</a></h3>
        </div>
    );
}

export default Register;