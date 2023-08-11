const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_profile');

const profilePopupCloseButton = profilePopup.querySelector('.popup__close');

const profileForm = profilePopup.querySelector('.form');

const nameInput = profileForm.querySelector('.form__text_type_name');

const jobInput = profileForm.querySelector('.form__text_type_job');

const profile = document.querySelector('.profile');

const profileName = profile.querySelector('.profile__name');

const profileJob = profile.querySelector('.profile__job');

const addPopup = function (item) {
  item.classList.add('popup_opened');
};

const removePopup = function (item) {
  console.log(item);
  item.classList.remove('popup_opened');
};

const addPopupProfile = function () {
  addPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const removePopupProfile = function () {
  removePopup(profilePopup);
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
  addPopup(newCardPopup);
};

const removeNewcardPopup = function () {
  removePopup(newCardPopup);
};

profileAddButton.addEventListener('click', addNewCardPopup);

popupCardCloseButton.addEventListener('click', removeNewcardPopup);

//Добавление карточек

const template = document.querySelector('#cards').content;

const gallery = document.querySelector('.gallery__cards');

const clickIconHandler = function (event) {
  event.currentTarget.classList.toggle('card__icon_active');
};

const removeClickHandler = function (event) {
  const cardItem = event.currentTarget.closest('.card');
  cardItem.remove();
};

const openCardImg = function (event) {
  addPopupImg();

  const card = event.currentTarget.parentElement;
  const title = card.querySelector('.card__title');

  popupCardImage.src = event.currentTarget.src;
  popupCardImage.alt = title.textContent;
  popupImgText.textContent = title.textContent;
};

initialCards.forEach(function (item) {
  gallery.append(addCard(item.name, item.link));
});

function addCard(name, link) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const buttonCardIcon = cardElement.querySelector('.card__icon');
  buttonCardIcon.addEventListener('click', clickIconHandler);
  const buttonCardRemove = cardElement.querySelector('.card__remove');
  buttonCardRemove.addEventListener('click', removeClickHandler);
  cardImageElement.addEventListener('click', openCardImg);
  return cardElement;
}

//Добавление карточки в начало списка
const nameCardInput = newCardPopup.querySelector('.form__text_type_name');
const linkCardInput = newCardPopup.querySelector('.form__text_type_link');

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(addCard(nameCardInput.value, linkCardInput.value));
  removeNewcardPopup();
  formCardElement.reset();
}

const formCardElement = newCardPopup.querySelector('.form');
formCardElement.addEventListener('submit', handleCardFormSubmit);

//Открытие и закрытие попапа с картинкой и текстом

const popupImg = document.querySelector('.popup_type_img');

const popupCloseButtonImg = popupImg.querySelector('.popup__close');

const popupCardImage = popupImg.querySelector('.popup__image-card');

const popupImgText = popupImg.querySelector('.popup__text');

const addPopupImg = function () {
  addPopup(popupImg);
};

const removePopupImg = function () {
  removePopup(popupImg);
};

popupCloseButtonImg.addEventListener('click', removePopupImg);

//6 sprint

//Закрытие попапа кликом на оверлей

const removePopupByClickingOverlay = function (event) {
  if (event.target === event.currentTarget) {
    removePopup(event.target);
  }
};

const setPopupEventListeners = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((item) => {
    item.addEventListener('click', removePopupByClickingOverlay);
  });
};

setPopupEventListeners();

//Закрытие попапа нажатием на Esc

const body = document.querySelector('.body');

body.addEventListener('keydown', function (evt) {
  console.log(evt.key);
  if (evt.key === 'Escape') {
    const p = document.querySelector('.popup_opened');
    if (p) removePopup(p);
  }
});
