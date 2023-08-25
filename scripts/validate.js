/*const hasInvalidInput = (inputList) => {
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
 
 const formList = Array.from(document.querySelectorAll(config.formSelector));
 formList.forEach((formElement) => {
   setEventListeners(formElement, config);
 });*/

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton = (item) => {
    item.setAttribute('disabled', true);
    item.classList.add(this._config.inactiveButtonClass);
  };

  _enableButton = (item) => {
    item.removeAttribute('disabled');
    item.classList.remove(this._config.inactiveButtonClass);
  };

  _setSubmitButtonState = (inputList, buttonElement, config) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, this._config);
    } else {
      this._enableButton(buttonElement, this._config);
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-${this._config.errorClass}`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-${this._config.errorClass}`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };


 _checkInputValidity = (config,inputElement,formElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
};

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      config.submitButtonSelector
    );
    this._setSubmitButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement, this._config);
        this._setSubmitButtonState(inputList, buttonElement, this._config);
      });
    });
  }
  enableValidation = () => {
      this._setEventListeners();

  };
}
