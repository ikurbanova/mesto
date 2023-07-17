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

const popupRemove= function () {
  popup.classList.remove ('popup_opened');
}

popupOpenButton.addEventListener('click', popupAdd);

popupCloseButton.addEventListener('click', popupRemove);


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupRemove();
}

formElement.addEventListener('submit', handleFormSubmit);

//кнопка сердечко при клике - чёрная

/*const buttonCardIcon = document.querySelectorAll(".card__icon");

const clickHandler = function (event) {
  event.currentTarget.classList.add("card__icon_active");
  
};

for (let i = 0; i < buttonCardIcon.length; i = i + 1) {

 buttonCardIcon[i].addEventListener('click', clickHandler); 

};*/




