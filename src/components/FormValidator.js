export default class FormValidator {
  constructor(formSelection, listOfClasses) {
    this._formSelection = document.querySelector(formSelection);
    this._input = Array.from(
      this._formSelection.querySelectorAll(listOfClasses.formInput)
    );
    this._listOfClasses = listOfClasses;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.popup__container-form-texts-${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__container-form-texts-${inputElement.id}-error`
    );
    errorElement.textContent = "";
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add("button_inactive");
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove("button_inactive");
      buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation() {
    this._formSelection.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const buttonElement = this._formSelection.querySelector(
      this._listOfClasses.submitButtonSelector
    );

    this._toggleButtonState(this._input, buttonElement, this._listOfClasses);

    this._input.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formSelection, inputElement);
        this._toggleButtonState(this._input, buttonElement);
      });
    });
  }
}
