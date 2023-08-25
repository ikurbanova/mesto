const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error',
};

const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_profile');

const profilePopupCloseButton = profilePopup.querySelector('.popup__close');

const profileForm = profilePopup.querySelector('.form');

const nameInput = profileForm.querySelector('.form__text_type_name');

const jobInput = profileForm.querySelector('.form__text_type_job');

const profile = document.querySelector('.profile');

const profileName = profile.querySelector('.profile__name');

const profileJob = profile.querySelector('.profile__job');

const openPopup = function (item) {
  item.classList.add('popup_opened');
  body.addEventListener('keydown', addEscListener);
};

const closePopup = function (item) {
  item.classList.remove('popup_opened');
  body.removeEventListener('keydown', addEscListener);
};

const addPopupProfile = function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const removePopupProfile = function () {
  closePopup(profilePopup);
};

profileEditButton.addEventListener('click', addPopupProfile);

profilePopupCloseButton.addEventListener('click', removePopupProfile);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopupProfile();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

//5 спринт

const profileAddButton = document.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_card');

const popupCardCloseButton = newCardPopup.querySelector('.popup__close');

const addNewCardPopup = function () {
  openPopup(newCardPopup);
};

const removeNewCardPopup = function () {
  closePopup(newCardPopup);
};

profileAddButton.addEventListener('click', addNewCardPopup);

popupCardCloseButton.addEventListener('click', removeNewCardPopup);

//Добавление карточек

const template = document.querySelector('#cards').content;

const gallery = document.querySelector('.gallery__cards');

/*const clickIconHandler = function (event) {
  event.currentTarget.classList.toggle('card__icon_active');
};

const removeClickHandler = function (event) {
  const cardItem = event.currentTarget.closest('.card');
  cardItem.remove();
};

const addCardImg = function (event) {
  addPopupImg();

  const card = event.currentTarget.parentElement;
  const title = card.querySelector('.card__title');

  popupCardImage.src = event.currentTarget.src;
  popupCardImage.alt = title.textContent;
  popupImgText.textContent = title.textContent;
};
*/

//Открытие и закрытие попапа с картинкой и текстом

const popupImg = document.querySelector('.popup_type_img');

const popupCardImage = popupImg.querySelector('.popup__image-card');

const popupImgText = popupImg.querySelector('.popup__text');

class Card {
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
  };

  _handleOpenPopup() {
    popupCardImage.src = this._link;
    popupImgText.textContent = this._name;
    openPopup(popupImg);
  }

  _handleClosePopup() {
    popupCardImage.src = '';
    popupImgText.textContent = '';
    closePopup(popupImg);
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

    this._cardRemove.addEventListener("click", ()=> {
      this._removeClickHandler();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonCardIcon = this._element.querySelector(".card__icon");
    this._cardRemove = this._element.querySelector(".card__remove");
    this._popupCloseButtonImg = popupImg.querySelector('.popup__close');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}

initialCards.forEach(function (item) {
  gallery.append(createCard(item));
  
});

function createCard(item) {
  const card = new Card(item, 'template');
  const cardElement = card.generateCard();
  return cardElement;
/*   
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const buttonCardIcon = cardElement.querySelector('.card__icon');
  buttonCardIcon.addEventListener('click', clickIconHandler);
  const buttonCardRemove = cardElement.querySelector('.card__remove');
  buttonCardRemove.addEventListener('click', removeClickHandler);
  cardImageElement.addEventListener('click', addCardImg);
  return cardElement; */
}

//Добавление карточки в начало списка
const nameCardInput = newCardPopup.querySelector('.form__text_type_name');
const linkCardInput = newCardPopup.querySelector('.form__text_type_link');

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(createCard({name: nameCardInput.value, link: linkCardInput.value}));
  removeNewCardPopup();
  formCardElement.reset();

  const buttonElement = formCardElement.querySelector(config.submitButtonSelector);

  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);

}

const formCardElement = newCardPopup.querySelector('.form');
formCardElement.addEventListener('submit', handleCardFormSubmit);


//const addPopupImg = function () {
// openPopup(popupImg);
//};

//const removePopupImg = function () {
//closePopup(popupImg);
//};

//popupCloseButtonImg.addEventListener('click', removePopupImg);

//6 sprint

//Закрытие попапа кликом на оверлей

const closePopupByClickingOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

const setPopupEventListeners = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((item) => {
    item.addEventListener('click', closePopupByClickingOverlay);
  });

};

setPopupEventListeners();

//Закрытие попапа нажатием на Esc

const body = document.querySelector('.body');

function addEscListener(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closePopup(openedPopup);
  }
}

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
})
// 7 sprint


/* initialCards.forEach((item) => {
  const card = new Card(item, 'template');
  const cardElement = card.generateCard();
  gallery.append(cardElement);
});
 */