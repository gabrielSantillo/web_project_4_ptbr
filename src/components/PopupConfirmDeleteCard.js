import Popup from "./Popup.js";

export default class PopupConfirmDeleteCard extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      "#popup-delete-post-button"
    );
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard()
        .then((data) => {
          console.log(data);
          super.close();
        })
        .catch((error) => {
          console.error("Error deleting the card:", error);
          super.close();
        });
    });
  }
}
