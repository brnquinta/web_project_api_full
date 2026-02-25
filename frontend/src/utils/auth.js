class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) return res.json();

    return res.text().then((text) => {
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {}

      return Promise.reject({
        status: res.status,
        data,
      });
    });
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name: "User", about: "About" }),
    }).then((res) => this._handleServerResponse(res));
  }

login({ email, password }) {
  return fetch(`${this._baseUrl}/signin`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => this._handleServerResponse(res));
}

  getUserAuth(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._handleServerResponse(res));
  }
}

const auth = new AuthApi({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
