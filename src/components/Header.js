import React from 'react';
import Logo from '../images/Vector.svg'

function Header() {
    return (
        <>
            <header className="header block-width">
                <img src={Logo} className="header__logo" alt="Лого Место"/>
                <a className="header__link" href="/signin">Войти</a>
            </header>
        </>
    );
}

export default Header;