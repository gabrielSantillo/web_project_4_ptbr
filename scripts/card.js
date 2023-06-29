import { popupElement, popupImage, popupCaption } from "./utils.js";

export default class Card {
  constructor(image, caption, popup) {
    this._image = image;
    this._caption = caption;
    this._popup = popup;
  }

  // probably I will have to switch an id for a class template
  _getTemplate() {
    const cardTemplate = document.querySelector("#template").content;
    const cardElement = cardTemplate
      .querySelector(".post__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element
      .querySelector(".post__card-image")
      .setAttribute("src", this._image);
    this._element.querySelector(".post__card-content-title").textContent =
      this._caption;

    return this._element;
  }

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupCaption.textContent = this._caption;
    popupElement.classList.add("popup-opened");
  }

  _handleClosePopup() {
    popupImage.src = "";
    popupCaption.textContent = "";
    popupElement.classList.remove("popup-opened");
  }

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();
  }

  _handleLikeButton(evt) {
    if (
      evt.target.src !==
      "http://127.0.0.1:5500/images/post/post-like-filled.png"
    ) {
      evt.target.setAttribute("src", "./images/post/post-like-filled.png");
    } else {
      evt.target.setAttribute("src", "./images/post/post-like.png");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".post__card-image")
      .addEventListener("click", () => {
        this._popup.open(this._image, this._caption)
      });

    this._element
      .querySelector(".post__card-remove")
      .addEventListener("click", (evt) => {
        this._handleDeleteButton(evt);
      });

    this._element
      .querySelector(".post__card-content-like")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
  }
}

// export default class Card {
//   constructor(image, caption, handleCardClick) {
//     this._image = image;
//     this._caption = caption;
//     this._handleCardClick = handleCardClick;
//   }

//   _getTemplate() {
//     const cardTemplate = document.querySelector("#template").content;
//     const cardElement = cardTemplate
//       .querySelector(".post__card")
//       .cloneNode(true);

//     return cardElement;
//   }

//   generateCard() {
//     this._element = this._getTemplate();
//     this._setEventListeners();

//     this._element
//       .querySelector(".post__card-image")
//       .setAttribute("src", this._image);
//     this._element.querySelector(".post__card-content-title").textContent =
//       this._caption;

//     return this._element;
//   }

//   _handleDeleteButton(evt) {
//     evt.target.parentElement.remove();
//   }

//   _handleLikeButton(evt) {
//     if (
//       evt.target.src !==
//       "http://127.0.0.1:5500/images/post/post-like-filled.png"
//     ) {
//       evt.target.setAttribute("src", "./images/post/post-like-filled.png");
//     } else {
//       evt.target.setAttribute("src", "./images/post/post-like.png");
//     }
//   }

//   _setEventListeners() {
//     this._element
//       .querySelector(".post__card-image")
//       .addEventListener("click", () => {
//         this._handleCardClick(this._image, this._caption);
//       });

//     this._element
//       .querySelector(".post__card-remove")
//       .addEventListener("click", (evt) => {
//         this._handleDeleteButton(evt);
//       });

//     this._element
//       .querySelector(".post__card-content-like")
//       .addEventListener("click", (evt) => {
//         this._handleLikeButton(evt);
//       });
//   }
// }

