export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    saveLike,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likesArr = data.likes;
    this._id = data._id;
    this._saveLike = saveLike;
    this._userId = userId
    
   

  }
  setDeleteConfirmHandler(callback) {
  this._openConfirmPopup = callback;
   
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
    this._buttonLike.classList.toggle('card__icon_active');
    this._saveLike(this._id)
  }

  refreshLike(arr) {
    this._likesArr = arr;
    this._cardLikes.textContent = this._likesArr.length;
  }

  _openConfirmPopup() {
    this._openConfirmPopup(this._id);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._openConfirmPopup();
    });
  }

  hasMyLike() {
    return this._likesArr.find(item => {
      return item['_id'] === this._userId
    })

    }
  

  generateCard(hasRemoveButton) {
    this._element = this._getTemplate();
    this._element.id = this._id;
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__icon');
    this._cardLikes = this._element.querySelector('.card__likes');
    this._cardRemoveButton = this._element.querySelector('.card__remove');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likesArr.length;
    const findData =  this._likesArr.find((item) => {
      return item['_id'] === this._userId
    });

    if(findData) {
      this._buttonLike.classList.toggle('card__icon_active');
    }
    this._element.querySelector('.card__title').textContent = this._name;
    if (!hasRemoveButton) {
      this._cardRemoveButton.remove();
    }
    return this._element;
  }
}
