import { initialCards, Card } from './Card.js';

import { FormValidator } from './FormValidator.js';

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

const body = document.querySelector('.body');

const popupImg = document.querySelector('.popup_type_img');

const cardImage = document.querySelector('.card__image');

const popupCardImage = popupImg.querySelector('.popup__image-card');

const popupImgText = popupImg.querySelector('.popup__text');

const popupCloseButtonImg = popupImg.querySelector('.popup__close');

//открытие  попапа
const openPopup = function (item) {
  item.classList.add('popup_opened');
  body.addEventListener('keydown', addEscListener);
};
//закрытие попапа
const closePopup = function (item) {
  item.classList.remove('popup_opened');
  body.removeEventListener('keydown', addEscListener);
};

//открытие и закрытие попапа profilePopup
const addPopupProfile = function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const removePopupProfile = function () {
  closePopup(profilePopup);
};

//слушатели
profileEditButton.addEventListener('click', addPopupProfile);

profilePopupCloseButton.addEventListener('click', removePopupProfile);

//перенос данных из профиля в попап

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopupProfile();
}
//слушатель

profileForm.addEventListener('submit', handleProfileFormSubmit);

const profileAddButton = document.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_card');

const popupCardCloseButton = newCardPopup.querySelector('.popup__close');

//открытие и закрытие попапа newCardPopup

const addNewCardPopup = function () {
  openPopup(newCardPopup);
};

const removeNewCardPopup = function () {
  closePopup(newCardPopup);
};
//слушатели

profileAddButton.addEventListener('click', addNewCardPopup);

popupCardCloseButton.addEventListener('click', removeNewCardPopup);

//Добавление карточек

const gallery = document.querySelector('.gallery__cards');

initialCards.forEach(function (item) {
  gallery.append(createCard(item));
});

function createCard(item) {
  const card = new Card(item, 'template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
//Добавление карточки в начало списка
const nameCardInput = newCardPopup.querySelector('.form__text_type_name');
const linkCardInput = newCardPopup.querySelector('.form__text_type_link');

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(
    createCard({ name: nameCardInput.value, link: linkCardInput.value })
  );
  removeNewCardPopup();
  formCardElement.reset();
  const buttonElement = formCardElement.querySelector(
    config.submitButtonSelector
  );
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);
}
//слушатель
const formCardElement = newCardPopup.querySelector('.form');
formCardElement.addEventListener('submit', handleCardFormSubmit);

//открытие и закрытие попапа popupImage

function handleCardClick (name, link) {
  popupCardImage.src = link;
  popupImgText.textContent = name;
  popupCardImage.alt = name;
  openPopup(popupImg);
}

const removePopupImg = function () {
  closePopup(popupImg);
};

popupCloseButtonImg.addEventListener('click', removePopupImg);

//function handleClosePopup() {
  //popupCardImage.src = '';
 // popupImgText.textContent = '';
  //popupCardImage.alt = "";
  //closePopup(popupImg);
//}

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
  
});
