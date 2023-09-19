export const initialCards = [
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

 export const config = {
   formSelector: '.form',
   inputSelector: '.form__input',
   submitButtonSelector: '.form__save',
   inactiveButtonClass: 'form__save_invalid',
   inputErrorClass: 'form__input_type_error',
   errorClass: 'error',
 };
 
export const profileEditButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.form__text_type_name');
export const jobInput = document.querySelector('.form__text_type_job');
export const profileAddButton = document.querySelector('.profile__add-button');

