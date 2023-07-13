// token 1c87feaf-7ea2-4dd9-b0cc-b4816af3e289
// group https://around.nomoreparties.co/v1/web_ptbr_05

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards(endpoint) {
    return fetch(this._baseUrl + endpoint, {
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

  addNewPost(endpoint, postName, postUrl) {
    return fetch(this._baseUrl + endpoint, {
      method: "POST",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postName,
        link: postUrl,
      }),
    });
  }

  getUserInfo(endpoint) {
    return fetch(this._baseUrl + endpoint, {
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

  updateUserInfo(endpoint, userName, userAbout) {
    return fetch(this._baseUrl + endpoint, {
      method: "PATCH",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    });
  }

  deleteCard(endpoint, cardId) {
    return fetch(this._baseUrl + endpoint + "/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json",
      },
    });
  }

  updateUserProfileImage(endpoint, imageUrl) {
    return fetch(this._baseUrl + endpoint, {
      method: "PATCH",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: imageUrl,
      }),
    });
  }

  addLike(endpoint, cardId, user) {
    return fetch(this._baseUrl + endpoint + cardId, {
      method: "PUT",
      headers: {
        authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: user,
      }),
    });
  }

  removeLike(endpoint, cardId) {
    return fetch(this._baseUrl + endpoint + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  }
}
