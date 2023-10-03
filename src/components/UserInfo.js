export class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar, selectorId) {
    this._nameElement = document.querySelector(selectorName);
    this._aboutElement = document.querySelector(selectorAbout);
    this._avatarElement = document.querySelector(selectorAvatar);
    this._id = selectorId
  }

  getUserInfo() {
    return  { name: this._nameElement.textContent, about: this._aboutElement.textContent};
    
  }

  setUserInfo(name, about, avatar) {
   this._nameElement.textContent =name;
   this._aboutElement.textContent =about;
   this._avatarElement.src = avatar;

  }
}
