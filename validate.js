
const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
 };
 
 const setSubmitButtonState = (inputList, buttonElement) => {
   if (hasInvalidInput(inputList)) {
     buttonElement.classList.add('form__save_invalid');
   } else {
     buttonElement.classList.remove('form__save_invalid');
   }
 };
 
 //показывает ошибку
 const showInputError = (formElement, inputElement) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.add('form__input_type_error');
   errorElement.textContent = inputElement.validationMessage;
 };
 //скрывает ошибку
 const hideInputError = (formElement, inputElement) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.remove('form__input_type_error');
   errorElement.textContent = '';
 };
 
 const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
     hideInputError(formElement, inputElement);
   }
 };
 
 const setEventListeners = (formElement) => {
   const inputList = Array.from(formElement.querySelectorAll('.form__input'));
   const buttonElement = formElement.querySelector('.form__save');
   setSubmitButtonState(inputList, buttonElement);
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       checkInputValidity(formElement, inputElement);
       setSubmitButtonState(inputList, buttonElement);
     });
   });
 };
 
 const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll('.form'));
   formList.forEach((formElement) => {
     setEventListeners(formElement);
   });
 };
 
 enableValidation();
 
 