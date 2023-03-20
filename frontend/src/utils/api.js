class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers:  this._headers })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers:  this._headers })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers:  this._headers
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    editProfileAvatar(obj) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers:  this._headers,
            body: JSON.stringify({
                avatar: obj.avatar
            })
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    editUserInfo(obj) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers:  this._headers,
            body: JSON.stringify({
              name: obj.name,
              about: obj.about
            })
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers:  this._headers
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    deleteLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers:  this._headers
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    addCard = (items) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers:  this._headers,
            body: JSON.stringify({
                name: items.name,
                link: items.link
            })
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }
}

export default Api