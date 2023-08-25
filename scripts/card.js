export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export class Card {
  static template = document.querySelector('#cards').content;
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _removeClickHandler() {
    this._cardItem = this._element.closest('.card');
    this._cardItem.remove();
  }

  _addEscListener = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) this._handleClosePopup();
    }
  };

  _handleOpenPopup() {
    this._popupCardImage.src = this._link;
    this._popupImgText.textContent = this._name;
    this._popupImg.classList.add('popup_opened');
    document.addEventListener('keydown', this._addEscListener);
  }

  _handleClosePopup() {
    this._popupCardImage.src = '';
    this._popupImgText.textContent = '';
    this._popupImg.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._addEscListener);
  }

  _clickIconHandler() {
    this._buttonCardIcon.classList.toggle('card__icon_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._popupCloseButtonImg.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._buttonCardIcon.addEventListener('click', () => {
      this._clickIconHandler();
    });

    this._cardRemove.addEventListener('click', () => {
      this._removeClickHandler();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._popupImg = document.querySelector('.popup_type_img');
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonCardIcon = this._element.querySelector('.card__icon');
    this._cardRemove = this._element.querySelector('.card__remove');
    this._popupCloseButtonImg = this._popupImg.querySelector('.popup__close');
    this._popupCardImage = this._popupImg.querySelector('.popup__image-card');
    this._popupImgText = this._popupImg.querySelector('.popup__text');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}
