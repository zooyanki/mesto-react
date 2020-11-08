import React from 'react';
import Logo from '../images/Vector.svg'

function Header() {
    return (
        <>
            <header className="header block-width">
                <img src={Logo} className="header__logo" alt="Лого Место"/>
            </header>
        </>
    );
}

export default Header;