// token 1c87feaf-7ea2-4dd9-b0cc-b4816af3e289
// group https://around.nomoreparties.co/v1/web_ptbr_05

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
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
}
