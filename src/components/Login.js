import React, { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    
    const handleChangePassword = (e) => {
        setPassword(e.taget.value); 
    }

    return (
        <div className="sign">
            <h2 className="sign__header">Вход</h2>
            <input className="sign__input" value="E-mail"></input>
            <input className="sign__input" value="Password"></input>
            <button className="sign__buttonSubmit">Войти</button>
        </div>
    )
}

export default Login;




