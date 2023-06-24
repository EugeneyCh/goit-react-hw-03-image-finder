import React, { Component } from 'react';
import css from './Modal.module.css';
// import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    // console.log('Shot on backdrop');
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    // console.log('Modal Image:', image);

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img src={image} alt={image} />
        </div>
      </div>,
      modalRoot
    );
    //   document.getElementById('modal-root')
  }
}
export default Modal;
