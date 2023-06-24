import React, { Component } from 'react';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';

class Modal extends Component {
  render() {
    const { image } = this.props;
    console.log('Modal Image:', image);

    return ReactDOM.createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={image} alt={image} />
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}
export default Modal;
