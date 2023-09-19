export class UserInfo {
  constructor(selectorName, selectorAbout) {
    this._nameElement = document.querySelector(selectorName);
    this._aboutElement = document.querySelector(selectorAbout);
  }

  getUserInfo() {
    return  { name: this._nameElement.textContent, about: this._aboutElement.textContent};
    
  }

  setUserInfo(name, about) {
   this._nameElement.textContent =name;
   this._aboutElement.textContent =about;

  }
}
