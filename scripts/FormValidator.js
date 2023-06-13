const listOfClasses = {
  formSelector: ".form",
  fieldsetList: ".form__set",
  formInput: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__container-form-texts-",
};

class FormValidator {
  constructor(data, formSelection) {
    this._form = document.querySelector(formSelection);
    this._input = Array.from()

    // const inputList = Array.from(
    //   formElement.querySelectorAll(listOfClasses.formInput)
    // );
    // const buttonElement = formElement.querySelector(
    //   listOfClasses.submitButtonSelector
    // );
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.popup__container-form-texts-${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__container-form-texts-${inputElement.id}-error`
    );
    errorElement.textContent = "";
  };

  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("button_inactive");
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove("button_inactive");
      buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners (formElement, listOfClasses) {
    const inputList = Array.from(
      formElement.querySelectorAll(listOfClasses.formInput)
    );
    const buttonElement = formElement.querySelector(
      listOfClasses.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, listOfClasses);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation (listOfClasses) {
    const formList = document.querySelectorAll(listOfClasses.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(
        formElement.querySelectorAll(listOfClasses.fieldsetList)
      );

      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset, listOfClasses);
      });
    });
  };
}
