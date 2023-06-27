import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
