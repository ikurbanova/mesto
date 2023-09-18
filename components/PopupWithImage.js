import {Popup} from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(selector) {
      super(selector);
      this._popupCardImage = this._popup.querySelector(".popup__image-card");
      this._popupImgText = this._popup.querySelector(".popup__text");
   }

   open(name, link) {
      super.open();
      this._popupCardImage.src = link;
      this._popupImgText.textContent = name;
      this._popupCardImage.alt = name;

    }

}