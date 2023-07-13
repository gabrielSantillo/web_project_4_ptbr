import {
  popupElement,
  popupImage,
  popupCaption,
  popupDeletePostIcon,
  popupDeletePostButton,
} from "../utils/utils.js";

import {api, user} from "../index.js";

export default class Card {
  constructor(
    image,
    caption,
    popup,
    likes,
    isCardOwner,
    imageId,
    handleDeleteCard,
  ) {
    this._image = image;
    this._caption = caption;
    this._popup = popup;
    this._likes = likes;
    this._isCardOwner = isCardOwner;
    this._imageId = imageId;
    this._handleDeleteCard = handleDeleteCard;
  }

  // probably I will have to switch an id for a class template
  _getTemplate() {
    const cardTemplate = document.querySelector("#template").content;
    const cardElement = cardTemplate
      .querySelector(".post__card")
      .cloneNode(true);

    cardElement.dataset.cardId = this._imageId;

    return cardElement;
  }

  generateCard(isCardOwner) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element
      .querySelector(".post__card-image")
      .setAttribute("src", this._image);
    this._element
      .querySelector(".post__card-image")
      .setAttribute("alt", this._caption);
    this._element.querySelector(".post__card-content-title").textContent =
      this._caption;
    this._element.querySelector(".post__card-content-like_count").textContent =
      this._likes;
    this._isCardOwner = isCardOwner;

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

  _handleDeleteButton() {
    this._handleDeleteCard(this._element.dataset.cardId);
  }

  _handleLikeButton(evt) {
    // if (
    //   evt.target.src !==
    //   "http://127.0.0.1:5500/images/post/post-like-filled.png"
    // ) {
    //   evt.target.setAttribute("src", "<%=require('./images/post/post-like-filled.png')%>");
    // } else {
    //   evt.target.setAttribute("src", "<%=require('./images/post/post-like.png')%>");
    // }

    // this._handleLikeCard(this._element.dataset.cardId);

    const likeButton = this._element.querySelector(".post__card-content-like");

    if (likeButton.classList.contains("post__card-content-like_active")) {
      // Remove a curtida
      api
        .removeLike("cards/likes/", this._element.dataset.cardId)
        .then((res) => res.json())
        .then((data) => {
          // Atualiza o contador de curtidas
          console.log(evt.target)
          this._element.querySelector(
            ".post__card-content-like_count"
          ).textContent = data.likes.length;

          // Remove a classe de ativo do botão de curtir
          likeButton.classList.remove("post__card-content-like_active");

        })
        .catch((error) => {
          console.error("Erro ao remover curtida:", error);
        });
    } else {
      // Adiciona a curtida
      api
        .addLike("cards/likes/", this._element.dataset.cardId, user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          // Atualiza o contador de curtidas
          this._element.querySelector(
            ".post__card-content-like_count"
          ).textContent = data.likes.length;

          // Adiciona a classe de ativo ao botão de curtir
          likeButton.classList.add("post__card-content-like_active");
        })
        .catch((error) => {
          console.error("Erro ao adicionar curtida:", error);
        });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".post__card-image")
      .addEventListener("click", () => {
        this._popup.open(this._image, this._caption);
      });

    const deleteCardButton = this._element.querySelector(".post__card-remove");

    if (this._isCardOwner) {
      deleteCardButton.addEventListener("click", (evt) => {
        this._handleDeleteButton();
      });

      deleteCardButton.style.display = "block";
    } else {
      deleteCardButton.style.display = "none";
    }

    this._element
      .querySelector(".post__card-content-like")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
  }
}
