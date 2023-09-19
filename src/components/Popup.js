export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _closePopupByClickingOverlay =(event)=>  {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._closePopupByClickingOverlay);
  }
};
