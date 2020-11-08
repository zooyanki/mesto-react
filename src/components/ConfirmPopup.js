import React from 'react';

function ConfirmPopup() {
    return (
        <>
            <div className="modal modal_confirmpopup">
                <div className="modal__overlay"></div>
                <form className="modal__form" name="modal-confirmpopup" action="#">
                    <button className="modal__button-close" type="button" aria-label="close"></button>
                    <div className="modal__frame">
                        <h3 className="modal__heading modal__heading_confirmpopup">Вы уверены?</h3>
                        <button className="modal__submit-button" type="submit" aria-label="confirm">Да</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ConfirmPopup;