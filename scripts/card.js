const images = [
  {
    title: "Vale de Yosemite",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    title: "Lago Louise",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    title: "Montanhas Carecas",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    title: "Latemar",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    title: "Parque Nacional da Vanoise ",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const popupElement = document.querySelector(".image");
const popupCloseButton = document.querySelector(".image__container-close");
const popupImage = document.querySelector(".image__container-photo");
const popupCaption = document.querySelector(".image__container-name");


export default class Card {
  constructor(image, caption) {
    this._image = image;
    this._caption = caption;
  }

  // probably I will have to switch an id for a class template
  _getTemplate() {
    const cardTemplate = document.querySelector("#template").content;
    const cardElement = cardTemplate.querySelector(".post__card").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".post__card-image").setAttribute("src", this._image);
    this._element.querySelector(".post__card-content-title").textContent = this._caption;

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
    evt.target.setAttribute("src", "./images/post/post-like-filled.png");
  }

  _setEventListeners() {
    this._element.querySelector(".post__card-image").addEventListener("click", () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    this._element.querySelector(".post__card-remove").addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });

    this._element.querySelector(".post__card-content-like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

  }
}
