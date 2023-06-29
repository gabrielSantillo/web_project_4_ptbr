import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.image__container-photo');
    this._captionElement = this._popup.querySelector('.image__container-name');
  }

  open(imageUrl, caption) {
    this._imageElement.src = imageUrl;
    this._captionElement.textContent = caption;
    super.open();
  }
}
