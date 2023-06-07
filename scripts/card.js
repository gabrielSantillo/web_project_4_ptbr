class Card {
  constructor(cardSelector) {
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

  _handleOpenPopup(evt) {
    if (evt.target.id === "add-post") {
      popupAddPost.classList.add("popup-opened");
    } else if (evt.target.id === "edit-profile") {
      popupSection.classList.add("popup-opened");
    } else {
      const postImage = document.querySelector(".image");
      postImage.classList.add("popup-opened");
    }
  }

  _handleClosePopup(evt) {
    if (
      evt.target.id === "close-button-post" ||
      evt.target.id === "save-button-post"
    ) {
      popupAddPost.classList.remove("popup-opened");
    } else {
      popupSection.classList.remove("popup-opened");
    }
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
        this._handleOpenPopup(evt);
    })
  }
}
