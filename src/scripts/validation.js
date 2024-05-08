export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  validationSettings,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = " ";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      validationSettings,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

export function clearValidation(formElement, validationSettings) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationSettings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationSettings.submitButtonSelector
    );
  
    inputList.forEach((inputElement) =>
      hideInputError(formElement, inputElement, validationSettings)
    );
    toggleButtonState(inputList, buttonElement, validationSettings);
  }