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

class Card {
  constructor(image, caption, cardSelector) {
    this._image = image;
    this._caption = caption;
    this._cardSelector = cardSelector;
  }

  // probably I will have to switch an id for a class template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector("#template")
      .clodeNode(true);

    return cardElement;
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

  _setEventListeners() {
    this._element.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });
  }
}
