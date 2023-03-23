export const BASE_URL = 'https://api.juryjo-mesto.nomoredomains.work';

function _checkResponse(res) {
  const response = res.json()
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  response.then(r => {return r})
  //console.log(response)
  //return response;
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    //console.log(response, response.json())
    return _checkResponse(response)
  })
};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    return _checkResponse(response)
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    return _checkResponse(response)
  })
}