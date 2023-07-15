import Popup from "./Popup.js";

export default class PopupEditProfileImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__container-form");
  }

  _getInputValues() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(".popup__container-form-texts-input")
    );
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
