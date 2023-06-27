export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = () => this._handleEscClose();
  }

  open() {
    this._popup.classList.add("popup-opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeIcon = this._popup.querySelector(".close-icon");
    closeIcon.addEventListener("click", () => this.close()); 

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });

    document.addEventListener("keydown", this._handleEscClose);
  }
}
