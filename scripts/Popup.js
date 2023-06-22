export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {

  }

  close() {

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
