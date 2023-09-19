import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../utils/constants.js';
import { config, profileEditButton } from '../utils/constants.js';
import { nameInput, jobInput, profileAddButton} from '../utils/constants.js';
import "./index.css";
const profilePopup = new PopupWithForm(
  '.popup_type_profile',
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_img');

imagePopup.setEventListeners();

const formList = Array.from(document.querySelectorAll(config.formSelector));

const profileValidator = new FormValidator(config, formList[0]);
profileValidator.enableValidation();

const cardValidator = new FormValidator(config, formList[1]);
cardValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__job');

//открытие и закрытие попапа profilePopup
const addPopupProfile = function () {
  profilePopup.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
  profileValidator.resetValidation();
};

//слушатели
profileEditButton.addEventListener('click', addPopupProfile);

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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item), 'end');
    },
  },
  '.gallery__cards'
);

cardList.renderItems();

const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);

function handleCardFormSubmit(values) {
  cardList.addItem(
    createCard({ name: values['input-card'], link: values['input-url'] }),
    'start'
  );

  cardPopup.close();
}

const addNewCardPopup = function () {
  cardValidator.resetValidation();
  cardPopup.open();
};

profileAddButton.addEventListener('click', addNewCardPopup);

cardPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}
