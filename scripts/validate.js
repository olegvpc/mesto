function showInputError(formElement, inputElement, errorMessage, dataObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(dataObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataObject.errorClass);
};

function hideInputError (formElement, inputElement, dataObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(dataObject.inputErrorClass);
  errorElement.classList.remove(dataObject.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, dataObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dataObject);
  } else {
    hideInputError(formElement, inputElement, dataObject);
  }
};

  function setEventListeners (formElement, dataObject) {
    const inputList = Array.from(formElement.querySelectorAll(dataObject.inputSelector));
    const buttonElement = formElement.querySelector(dataObject.submitButtonSelector)

      //  начальная установка состояния кнопок submit
    toggleButtonState (inputList, buttonElement, dataObject);
    inputList.forEach((inputElement) => {
      // checkInputValidity(formElement, inputElement, dataObject); // при вызове popup подсвечивает сразу невалидные поля

      // вешаем слушатель на нобор текста в каждом input
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, dataObject);
        toggleButtonState (inputList, buttonElement, dataObject);

      });
    });
  };

function hasInvalidInput (inputList) {
  // inputList.forEach(input => console.log(input.value, input.validationMessage))
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}
function inactivateSubmitButton (buttonElement, dataObject) {
  buttonElement.classList.add(dataObject.inactiveButtonClass); // рисуем неактивную кнопку
  buttonElement.setAttribute("disabled", ""); // делаем функцию submit - disabled
}
function activateSubmitButton (buttonElement, dataObject) {
  buttonElement.classList.remove(dataObject.inactiveButtonClass); // снимаем класс неактивной кнопки
  buttonElement.removeAttribute("disabled", "") // убираем атрибут disabled
}
// переключение кнопки submit в акивное и неактиивное состояние
function toggleButtonState (inputList, buttonElement, dataObject) {
  if (hasInvalidInput (inputList)) {
    inactivateSubmitButton(buttonElement, dataObject);
  } else {
    activateSubmitButton(buttonElement, dataObject);
  }
}

function enableValidation ({formSelector, ...restDataValidation}) {
  // console.log(formSelector, {...restDataValidation})
  const formList = Array.from(document.querySelectorAll(formSelector))
  formList.forEach(form => {
    setEventListeners(form, {...restDataValidation}) // спасибо - интересно, но если и дальше использовать ...rest
    //  - то код становится трудно читаемым и легко запутаться с теми данными, которые остались в объекте.
  })
};

enableValidation(dataValidation);
