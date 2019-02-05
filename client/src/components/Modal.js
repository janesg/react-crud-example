import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    /* Clicking on the background will navigate back to root 
            - effectively this dismisses the modal */
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active"
             onClick={ props.onDismiss }>
            {/* Prevent click on modal panel from also dismissing modal */}
            <div className="ui standard modal visible active"
                 onClick={ event => event.stopPropagation() }>
                <div className="header">{ props.title }</div>
                <div className="content">{ props.content }</div>
                <div className="actions">{ props.actions }</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;