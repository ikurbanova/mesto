const onError = (response) => {
   if (response.ok) {
     return response.json();
   } else {
     return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
   }
 }

export class Api {
  constructor(obj) {
    this._url = obj.url;
    this._headers = obj.headers;
  }

  getAllCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
    })
    .then((response) => onError(response))
  }

  getProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
    })
    .then((response) => onError(response))
  }

  editProfileData(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    })
    .then((response) => onError(response))
  }

  addNewCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link),
    })
    .then((response) => onError(response))
  }

  saveLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((response) => onError(response))
  }

  deleteLike(id) {
     return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => onError(response))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => onError(response))
  }

  updateAvatar(avatar) {
   return fetch(this._url + '/users/me/avatar', {
     method: 'PATCH',
     headers: this._headers,
     body: JSON.stringify({avatar: avatar}),
    })
    .then((response) => onError(response))
 }
}
