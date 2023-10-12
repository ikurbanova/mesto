export class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar) {
    this._nameElement = document.querySelector(selectorName);
    this._aboutElement = document.querySelector(selectorAbout);
    this._avatarElement = document.querySelector(selectorAvatar);
    
  }

  getUserInfo() {
    return  { name: this._nameElement.textContent, about: this._aboutElement.textContent, avatar: this._avatarElement.src};
    
  }

  setUserInfo(name, about, avatar) {
   this._nameElement.textContent =name;
   this._aboutElement.textContent =about;
   this._avatarElement.src = avatar;

  }
}
