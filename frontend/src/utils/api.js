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
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards`, { headers:  {
            autorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        } })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/users/me`, { headers:  {
            autorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        } })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    deleteCard(id) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    editProfileAvatar(obj) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: obj.avatar
            })
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    editUserInfo(obj) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    deleteLikeCard(id) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
         });
    }

    addCard = (items) => {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers:  {
                autorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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