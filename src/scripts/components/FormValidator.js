export default class FormValidator {
  constructor (dataValidation, formElement) {
    this._inputSelector = dataValidation.inputSelector;
    this._submitButtonSelector = dataValidation.submitButtonSelector;
    this._inactiveButtonClass = dataValidation.inactiveButtonClass;
    this._inputErrorClass = dataValidation.inputErrorClass;
    this._errorClass = dataValidation.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass); // подчеркивание красным
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass); // видимость ошибки
  };
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
    // Проверяет все input формы (форма одна) на валидность, чтобы предотвратить отправку,
    // если какой-либо из них не валиден
  _hasInvalidInput () {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }
    // Переключает кнопку в disadled и меняет внешний вид на неактивную
    // этот метод вызывается снаружи
  inactiveButtonSubmit () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.inactiveButtonSubmit()
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
    // Сбросим ошибки во всех полях input и приведем кнопку в соответствующее валидации состояние
  resetValidation () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }
  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid (inputElement);
        this._toggleButtonState();
      });
    });
  };
  enableValidation() {
    this._setEventListeners();
  }
}

