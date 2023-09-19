export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };

  _enableButton = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  };

  _setSubmitButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
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
    this._setSubmitButtonState(this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState(this._buttonElement);
      });
    });
  }
  resetValidation() {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
