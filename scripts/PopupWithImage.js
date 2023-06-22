import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open() {
        this._element = null // I need to get a template somehow here to add the img src and caption
    }
}