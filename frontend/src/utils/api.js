import { getToken } from "./token.js"; // MUDOU: usar util padronizado

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(result) {
    return result.ok ? result.json() : Promise.reject(`Error: ${result.status}`);
  }

  _getHeaders() {
    const token = getToken(); // MUDOU: antes era localStorage.getItem("token")
    return {
      ...this._headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then((result) => this._handleServerResponse(result));
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  editProfileinfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then((result) => this._handleServerResponse(result));
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((result) => this._handleServerResponse(result));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._getHeaders(),
    }).then((result) => this._handleServerResponse(result));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((result) => this._handleServerResponse(result));
  }

  editProfileAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarLink }),
    }).then((result) => this._handleServerResponse(result));
  }
}

const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;