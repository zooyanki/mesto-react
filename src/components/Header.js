import React, {useRef} from 'react';
import Logo from '../images/Vector.svg'

function Header(props) {

    return (
        <>
            <header className="header block-width">
                <img src={Logo} className="header__logo" alt="Лого Место"/>
                <a className="header__link" href={props.value.link} onClick={props.onSelectLogin}>{props.value.text}</a>
            </header>
        </>
    );
}

export default Header;