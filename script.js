const popupOpenButton = document.querySelector('.profile__editbutton_active');

const popup = document.querySelector('.popup');

const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
};

popupOpenButton.addEventListener('click', popupToggle);

popupCloseButton.addEventListener('click', popupToggle);

const formElement = document.querySelector('.input');

const nameInput = formElement.querySelector('.input__text_name');

const jobInput = formElement.querySelector('.input__text_job');

const profile = document.querySelector('.profile');

const Name = profile.querySelector('.profile__names');

const Job = profile.querySelector('.profile__job');

function handleFormSubmit(evt) {
  evt.preventDefault();
  Name.textContent = nameInput.value;
  Job.textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener('submit', handleFormSubmit);

//кнопка сердечко при клике - чёрная

const buttons = document.querySelectorAll('.card__icon_active');

const clickHandler = function (event) {
  event.currentTarget.innerHTML = `
      <img src="./images/blackheart.png"
      alt="кнопка сердечко"
      class="card__icon-image"/>`;
};

for (let i = 0; i < buttons.length; i = i + 1) {
  buttons[i].addEventListener('click', clickHandler);
}
