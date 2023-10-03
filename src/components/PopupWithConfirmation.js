import { Popup } from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
  }

  setPayload(payload) {
   this._payload = payload;
  }

  _getInputValues() {
    const res = {};
    this._inputList.forEach((inputElement) => {
      res[inputElement.id] = inputElement.value;
    });
    return res;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._payload);
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  };


}
