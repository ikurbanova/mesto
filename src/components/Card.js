

export class Card {
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

  _handleRemoveClick() {
    this._cardItem = this._element.closest('.card');
    this._cardItem.remove();
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('card__icon_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._handleRemoveClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__icon');
    this._cardRemoveButton = this._element.querySelector('.card__remove');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}
