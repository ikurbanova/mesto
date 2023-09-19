import {Card} from "./Card.js";

export class Section {
   constructor ({data, renderer}, selector) {
      this._renderedItems = data;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
      
   }
   renderItems() {
      this._renderedItems.forEach((item)=> {
         this._renderer(item);
      }
      );
   }

   addItem(element, place) {
      if (place === 'start') this._container.prepend(element);
      if (place === 'end') this._container.append(element);
     
   }
}