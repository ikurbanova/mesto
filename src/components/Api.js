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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProfile() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfileData(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveLike(id) {
    console.log(this._url);
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Что то пошло не так...');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
