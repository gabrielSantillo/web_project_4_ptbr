export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add("popup-opened");
  }

  close() {
    this._popup.classList.remove("popup-opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      const popup = Array.from(document.querySelectorAll(".popup"));
      popup.forEach((element) => {
        element.classList.remove("popup-opened");
      });
    }
  }
}
