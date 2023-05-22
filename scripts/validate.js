const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.input__${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.input__${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, listOfClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(listOfClasses.formInput));
  const buttonElement = formElement.querySelector(listOfClasses.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (listOfClasses) => {
  const formList = Array.from(document.querySelectorAll(listOfClasses.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(listOfClasses.fieldsetList));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, listOfClasses);
    });
  });
};

enableValidation({
    formSelector: ".form",
    fieldsetList: ".form__set",
    formInput: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });
