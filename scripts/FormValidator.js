export class FormValidator {
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

  _checkInputValidity = (inputElement) => {
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
      this._config.submitButtonSelector
    );
    this._setSubmitButtonState(inputList, buttonElement, this._config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState(inputList, buttonElement, this._config);
      });
    });
  }
  enableValidation = () => {
    this._setEventListeners();
  };
}
