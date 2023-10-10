import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig, profileEditButton } from '../utils/constants.js';
import { nameInput, jobInput, profileAddButton } from '../utils/constants.js';
import './index.css';
import { Api } from '../components/Api.js';
import { buttonAvatar, avatarUpdate } from '../utils/constants.js';
let userId;

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__job',
  '.profile__avatar-image'
);

const apiOptions = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'ae8b4936-57e0-4bde-8d30-961175db61c4',
    'Content-Type': 'application/json',
  },
};

function createCard(item) {
  const openPopupWithCard = () => {
    openConfirmPopup(card);
  };

  const handleLikeIconClick = (id) => {
    if (!card.hasMyLike()) {
      api.saveLike(id).then((data) => card.refreshLike(data.likes));
    } else {
      api.deleteLike(id).then((data) => card.refreshLike(data.likes));
    }
  };
  const card = new Card(
    item,
    'template',
    handleCardClick,
    handleLikeIconClick,
    userId
  );
  let hasRemoveButton = false;

  if (!item.owner || item.owner['_id'] === userId) {
    hasRemoveButton = true;
  }
  card.setDeleteConfirmHandler(() => openPopupWithCard(card));
  const cardElement = card.generateCard(hasRemoveButton);
  return cardElement;
}

const api = new Api(apiOptions);
let cardSection;
api.getAllCards().then((data) => {
  cardSection = new Section(
    {
      data: data,
      renderer: (item) => {
        cardSection.appendItem(createCard(item));
      },
    },
    '.gallery__cards'
  );

  cardSection.renderItems();
});

api.getProfile().then((data) => {
  userId = data['_id'];
  userInfo.setUserInfo(data['name'], data['about'], data['avatar']);
});

const profilePopup = new PopupWithForm(
  '.popup_type_profile',
  handleProfileFormSubmit
);

profilePopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation(
  '.popup_type_confirm',
  handleConfirmFormSubmit
);
confirmPopup.setEventListeners();

const openConfirmPopup = function (card) {
  confirmPopup.setPayload(card);

  confirmPopup.open();
};

function handleConfirmFormSubmit(card) {
  api.deleteCard(card._id).then(() => {
    card.removeCard();
    confirmPopup.close();
  });
}
const imagePopup = new PopupWithImage('.popup_type_img');

imagePopup.setEventListeners();

const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

const profileValidator = new FormValidator(validationConfig, formList[0]);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, formList[1]);
cardValidator.enableValidation();

//открытие и закрытие попапа profilePopup
const openProfilePopup = function () {
  profilePopup.open();
  const userObj = userInfo.getUserInfo();
  nameInput.value = userObj.name;
  jobInput.value = userObj.about;
  profileValidator.resetValidation();
};

profileEditButton.addEventListener('click', openProfilePopup);

function handleProfileFormSubmit(values) {
  api
    .editProfileData(values['input-name'], values['input-about'])
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      this._changeButtonText('Сохранить');
      profilePopup.close();
    });
}

const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);

function handleCardFormSubmit(values) {
  api
    .addNewCard({ name: values['input-card'], link: values['input-url'] })
    .then((data) => {
      cardSection.prependItem(createCard(data));
      this._changeButtonText('Сохранить');
      cardPopup.close();
    });
}

const openCardPopup = function () {
  cardValidator.resetValidation();
  cardPopup.open();
};

profileAddButton.addEventListener('click', openCardPopup);

cardPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleAvatarbutton() {
  avatarUpdate.classList.toggle('profile__avatar-update_active');
}

buttonAvatar.addEventListener('mouseover', handleAvatarbutton);
buttonAvatar.addEventListener('mouseout', handleAvatarbutton);
const avatarValidator = new FormValidator(validationConfig, formList[3]);
avatarValidator.enableValidation();

const avatarPopup = new PopupWithForm(
  '.popup_type_avatar',
  handleAvatarFormSubmit
);


avatarPopup.setEventListeners();

function openAvatarPopup() {
  avatarValidator.resetValidation();
  avatarPopup.open();
}

buttonAvatar.addEventListener('click', openAvatarPopup);

function handleAvatarFormSubmit(values) {
  api.updateAvatar(values['input-url-avatar']).then((data) => {
    this._changeButtonText('Сохранить');
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    avatarPopup.close();
  });
  
}
