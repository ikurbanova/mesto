import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../utils/constants.js';
import { validationConfig, profileEditButton } from '../utils/constants.js';
import { nameInput, jobInput, profileAddButton} from '../utils/constants.js';
import "./index.css";
const profilePopup = new PopupWithForm(
  '.popup_type_profile',
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_img');

imagePopup.setEventListeners();

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const profileValidator = new FormValidator(validationConfig, formList[0]);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, formList[1]);
cardValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__job');

//открытие и закрытие попапа profilePopup
const openProfilePopup = function () {
  profilePopup.open();
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  profileValidator.resetValidation();
};

//слушатели
profileEditButton.addEventListener('click', openProfilePopup);

//перенос данных из профиля в попап

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values['input-name'], values['input-about']);

  profilePopup.close();
}

function createCard(item) {
  const card = new Card(item, 'template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardSection.appendItem(createCard(item));
    },
  },
  '.gallery__cards'
);

cardSection.renderItems();

const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);

function handleCardFormSubmit(values) {
  cardSection.prependItem(
    createCard({ name: values['input-card'], link: values['input-url'] })
  
  );

  cardPopup.close();
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
