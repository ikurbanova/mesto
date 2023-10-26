export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardLike,
    userId,
    handlePopupConfirm
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likesArr = data.likes;
    this._id = data._id;
    //this._cardLikeHandler = handleCardLike;
    this._handleCardLike = handleCardLike;
    this._userId = userId;
    this._confirmPopupHandler = handlePopupConfirm;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  removeCard() {
    this._cardItem = this._element.closest('.card');
    this._cardItem.remove();
  }

  _handleLikeClick() {
    //this._cardLikeHandler(this._id);
    (this._handleCardLike(this._id));
    
  }

  refreshLike(arr) {
    this._likesArr = arr;
    this._cardLikes.textContent = this._likesArr.length;
    this._buttonLike.classList.toggle('card__icon_active');
  }

  _openConfirmPopup() {
    this._confirmPopupHandler(this._id);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._buttonLike.addEventListener('click', this._handleLikeClick.bind(this));

    this._cardRemoveButton.addEventListener('click', 
      this._openConfirmPopup.bind(this)
    )
  };

  isCurrentUserLiked() {
    return this._likesArr.find((item) => {
      return item._id === this._userId;
    });
  }

  getId() {
    return this._id;
  }

  generateCard(hasRemoveButton) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__icon');
    this._cardLikes = this._element.querySelector('.card__likes');
    this._cardRemoveButton = this._element.querySelector('.card__remove');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likesArr.length;
    const isLiked = this.isCurrentUserLiked();

    if (isLiked) {
      this._buttonLike.classList.toggle('card__icon_active');
    }
    this._element.querySelector('.card__title').textContent = this._name;
    if (!hasRemoveButton) {
      this._cardRemoveButton.remove();
    }
    return this._element;
  }
}
