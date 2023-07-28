const popupOpenButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');

const popupCloseButton = popup.querySelector('.popup__close');

const formElement = document.querySelector('.form');

const nameInput = formElement.querySelector('.form__text_type_name');

const jobInput = formElement.querySelector('.form__text_type_job');

const profile = document.querySelector('.profile');

const profileName = profile.querySelector('.profile__name');

const profileJob = profile.querySelector('.profile__job');

const popupAdd = function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const popupRemove = function () {
  popup.classList.remove('popup_opened');
};

popupOpenButton.addEventListener('click', popupAdd);

popupCloseButton.addEventListener('click', popupRemove);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupRemove();
}

formElement.addEventListener('submit', handleProfileFormSubmit);

//5 спринт

const popupNewCardOpenButton = document.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup_newcard');

const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');

const popupAddNewCard = function () {
  popupNewCard.classList.add('popup_opened');
};

const popupRemoveNewCard = function () {
  popupNewCard.classList.remove('popup_opened');
};

popupNewCardOpenButton.addEventListener('click', popupAddNewCard);

popupNewCardCloseButton.addEventListener('click', popupRemoveNewCard);

//Добавление карточек

const template = document.querySelector('#cards').content;

const gallery = document.querySelector('.gallery__cards');

const initialCards = [
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

initialCards.forEach(function (item) {
  const cardElement = template.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;

  gallery.append(cardElement);
});

//Добавление карточки в начало списка

const formCardElement = document.querySelector('.form_card');

const nameCardInput = formCardElement.querySelector('.form__text_type_name');

const linkCardInput = formCardElement.querySelector('.form__text_type_link');


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = template.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = nameCardInput.value;
  cardElement.querySelector('.card__image').src = linkCardInput.value;
  gallery.prepend(cardElement);
  popupRemoveNewCard();
  const cardButtonDelete = cardElement.querySelector(".card__remove");
  cardButtonDelete.addEventListener("click", clickRemove);
  const cardIcon = cardElement.querySelector(".card__icon");
  cardIcon.addEventListener("click",clickHandler);
}

formCardElement.addEventListener('submit', handleCardFormSubmit);

//Лайк карточки

const buttonCardIcon = document.querySelectorAll(".card__icon");

const clickHandler = function (event) {
  event.currentTarget.classList.toggle("card__icon_active");
};

buttonCardIcon.forEach(function(item) {

  item.addEventListener('click', clickHandler); 

}
);

//Удаление карточки

const buttonCardRemove = document.querySelectorAll(".card__remove");

const clickRemove = function (event) {
  const cardItem = event.currentTarget.closest(".card");
  cardItem.remove();
};

buttonCardRemove.forEach(function(item) {
  item.addEventListener('click', clickRemove); 
}
);

//Открытие и закрытие попапа с картинкой и текстом

const cardImageArray = document.querySelectorAll(".card__image");

const popupCard = document.querySelector(".popup-card");

const popupCardImage = popupCard.querySelector(".popup-card__image");

const cardTitle = gallery.querySelectorAll(".card__title");

const popupCardText = popupCard.querySelector(".popup-card__text");

const popupCardClose = popupCard.querySelector(".popup-card__close");


const popupOpenCard = function () {
  popupCard.classList.add ("popup-card_opened");
};

const cardOpenImage = function(event) {
  popupOpenCard();
  popupCardImage.src = event.currentTarget.src;
  const card = event.currentTarget.parentElement;
  const title = card.querySelector(".card__title");
  popupCardText.textContent = title.textContent;
  
};

cardImageArray.forEach(function(item) {

  item.addEventListener("click", cardOpenImage);
}
);
const buttonPopupCardClose = function() {
  popupCard.classList.remove("popup-card_opened");
};
popupCardClose.addEventListener("click", buttonPopupCardClose);










