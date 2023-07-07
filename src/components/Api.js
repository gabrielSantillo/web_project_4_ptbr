// token 1c87feaf-7ea2-4dd9-b0cc-b4816af3e289
// group https://around.nomoreparties.co/v1/web_ptbr_05

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateUserInfo(userName, userAbout, userImage) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    });
  }
}
