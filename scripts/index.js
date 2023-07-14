const popupOpenButton = document.querySelector('.profile__edit-button_active');

const popup = document.querySelector('.popup');

const popupCloseButton = popup.querySelector('.popup__close');

const popupAdd = function () {
  popup.classList.add('popup_opened');
};

const popupRemove= function () {
  popup.classList.remove ('popup_opened');
}

popupOpenButton.addEventListener('click', popupAdd);

popupCloseButton.addEventListener('click', popupRemove);

const formElement = document.querySelector('.form');

const nameInput = formElement.querySelector('.form__text_type_name');

const jobInput = formElement.querySelector('.form__text_type_job');

const profile = document.querySelector('.profile');

const ProfileName = profile.querySelector('.profile__name');

const ProfileJob = profile.querySelector('.profile__job');

function handleFormSubmit(evt) {
  evt.preventDefault();
  ProfileName.textContent = nameInput.value;
  ProfileJob.textContent = jobInput.value;
  popupRemove();
}

formElement.addEventListener('submit', handleFormSubmit);

//кнопка сердечко при клике - чёрная

const ButtonCardIcon = document.querySelectorAll(".card__icon");

const clickHandler = function (event) {
  event.currentTarget.classList.add("card__icon_active");
  
};

for (let i = 0; i < ButtonCardIcon.length; i = i + 1) {

 ButtonCardIcon[i].addEventListener('click', clickHandler); 

};




