import React, {useRef} from 'react';
import Logo from '../images/Vector.svg'

function Header(props) {

    return (
        <>
            <header className="header block-width">
                <img src={Logo} className="header__logo" alt="Лого Место"/>
                <div className="header__nav">
                    <h2 className="header__link">{props.email}</h2>
                    <a className="header__link" href={props.link} onClick={props.onSign}>{props.text}</a>
                </div>
            </header>
        </>
    );
}

export default Header;