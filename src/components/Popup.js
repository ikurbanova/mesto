export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    
   console.log(this._popup)
    this._closeButton = this._popup.querySelector('.popup__close');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.querySelector('.body').addEventListener('keydown', this._handleEscClose);
  };

  close() {
   console.log(this._popup)
    this._popup.classList.remove('popup_opened');
    document.querySelector('.body').removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) this.close(openedPopup);
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
