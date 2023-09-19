

export class Card {
  static template = document.querySelector('#cards').content;
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _clickIconHandler() {
    this._buttonCardIcon.classList.toggle('card__icon_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
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
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}
