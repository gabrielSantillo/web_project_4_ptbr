export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.parentElement.classList.add("popup-opened");
    this.setEventListeners();
  }

  close() {
    this._popup.parentElement.classList.remove("popup-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const popup = Array.from(document.querySelectorAll(".popup"));
      popup.forEach((element) => {
        element.classList.remove("popup-opened");
      });
    }
  }

  setEventListeners() {
    const closeIcon = this._popup.querySelector(".close-icon");
    const popupClose = document.querySelectorAll(".close-popup");

    closeIcon.addEventListener("click", () => this.close());

    popupClose.forEach((container) => {
      container.addEventListener("click", (evt) => {
        evt.target.classList.remove("popup-opened");
      });
    });

    document.addEventListener("keydown", this._handleEscClose);
  }
}
