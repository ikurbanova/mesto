import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._form = this._popup.querySelector('.form');
    this._buttonForm = this._popup.querySelector(".form__save");
  }

  _getInputValues() {
    const res = {};
    this._inputList.forEach((inputElement) => {
      res[inputElement.id] = inputElement.value;
    });
    return res;
  }

  _changeButtonText(save) {
    this._buttonForm.textContent =save;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._changeButtonText('Сохранить...');
      this._submitCallback(this._getInputValues());
    });
  }

  close = () => {
   
   super.close();
   this._form.reset();
  };
}
