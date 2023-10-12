const checkResponse = (response) => {
   if (response.ok) {
     return response.json();
   } else {
     return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
   }
 }

export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getAllCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
    })
    .then((response) => checkResponse(response))
  }

  getProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
    })
    .then((response) => checkResponse(response))
  }

  editProfileData(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about}),
    })
    .then((response) => checkResponse(response))
  }

  addNewCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link),
    })
    .then((response) => checkResponse(response))
  }

  saveLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((response) => checkResponse(response))
  }

  deleteLike(id) {
     return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => checkResponse(response))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => checkResponse(response))
  }

  updateAvatar(avatar) {
   return fetch(this._url + '/users/me/avatar', {
     method: 'PATCH',
     headers: this._headers,
     body: JSON.stringify({avatar: avatar}),
    })
    .then((response) => checkResponse(response))
 }
}
