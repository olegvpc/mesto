export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  // ответ с сайта - DRY
  _checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    // если ошибка отклоняем
    return Promise.reject(`Ошибка запроса API: ${response.status}`);
}

  // Получение карточек при загрузке
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  // Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Установка данных о пользователе
  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
      })
      .then(this._checkResponse);
}


  // Добавление карточки пользователем
  addUserCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse);
  };

  // Удаление карточки пользователем
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  };

  //   Установка лайка
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  };
    // Снятие лайков
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
    })
    .then(this._checkResponse)
  };
    // Обновление аватара профиля
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    })
    .then(this._checkResponse)
  };
}
