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
import {avatarUpdate} from '../utils/constants.js';
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

  const handleLikeIconClick = (id) => {
    if (!card.isCurrentUserLiked()) {
      api.saveLike(id).then((data) => card.refreshLike(data.likes))
      .catch((err) => {
        console.log(err);
      })
    } else {
      api.deleteLike(id).then((data) => card.refreshLike(data.likes))
      .catch((err) => {
        console.log(err);
      })
    }
  };
  const card = new Card(
    item,
    'template',
    handleCardClick,
    handleLikeIconClick,
    userId,
    () => openConfirmPopup(card)
  );
  const hasRemoveButton = item.owner['_id'] === userId; 

  const cardElement = card.generateCard(hasRemoveButton);
  return cardElement;
}

const api = new Api(apiOptions);
let cardSection;
Promise.all([
  api.getProfile(),
  api.getAllCards()
])
.then((dataArr) => {
  userId = dataArr[0]['_id'];
  userInfo.setUserInfo(dataArr[0]['name'], dataArr[0]['about'], dataArr[0]['avatar']);
  cardSection = new Section(
    {
      data: dataArr[1],
      renderer: (item) => {
        cardSection.appendItem(createCard(item));
      },
    },
    '.gallery__cards'
  );

  cardSection.renderItems();
})
.catch((err)=>{ 
  console.log(err);

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
  api.deleteCard(card.getId()).then(() => {
    card.removeCard();
    confirmPopup.close();
  })
  .catch((err) => {
    console.log(err);
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

  profilePopup.changeButtonText('Сохранить...');
  api
    .editProfileData(values['input-name'], values['input-about'])
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      profilePopup.changeButtonText('Сохранить');
      profilePopup.close();
    })
}

const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);

function handleCardFormSubmit(values) {
  cardPopup.changeButtonText('Сохранить...');
  api
    .addNewCard({ name: values['input-card'], link: values['input-url'] })
    .then((data) => {
      cardSection.prependItem(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      cardPopup.changeButtonText('Сохранить');
      cardPopup.close();
    })
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

avatarUpdate.addEventListener('click', openAvatarPopup);

function handleAvatarFormSubmit(values) {
  avatarPopup.changeButtonText('Сохранить...');
  api
    .updateAvatar(values['input-url-avatar'])
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      avatarPopup.changeButtonText('Сохранить');
      avatarPopup.close();
    })

}
