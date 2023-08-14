

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
 };

 const disableButton = function (item, config) {
  item.setAttribute('disabled', true);
  item.classList.add(config.inactiveButtonClass);
 };

 const enableButton = function (item,config) {
  item.removeAttribute('disabled');
  item.classList.remove(config.inactiveButtonClass);
 };
 
 const setSubmitButtonState = (inputList, buttonElement, config) => {
   if (hasInvalidInput(inputList)) {
     disableButton(buttonElement, config);

   } else {
    enableButton(buttonElement, config);
   }
 };
 
 //показывает ошибку
 const showInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-${config.errorClass}`);
   inputElement.classList.add(config.inputErrorClass);
   errorElement.textContent = inputElement.validationMessage;
 };
 //скрывает ошибку
 const hideInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-${config.errorClass}`);
   inputElement.classList.remove(config.inputErrorClass);
   errorElement.textContent = '';

 };
 
 const checkInputValidity = (formElement, inputElement, config) => {
   if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, config);
   } else {
     hideInputError(formElement, inputElement, config);
   }
 };
 
 const setEventListeners = (formElement, config) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);
   setSubmitButtonState(inputList, buttonElement, config);
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       checkInputValidity(formElement, inputElement, config);
       setSubmitButtonState(inputList, buttonElement, config);
     });
   });
 };
 
 const enableValidation = (config) => {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
     setEventListeners(formElement, config);
   });
 };
 

 
 