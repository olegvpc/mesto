import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmit) {
        super(popupSelector);

        this._callbackSubmit = callbackSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupButton = this._popupForm.querySelector('.popup__button');
        this._buttonText = this._popupButton.textContent; // сохранение начальной надписи на кнопке
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    // Cобирает данные всех полей формы
    _getInputValues() {
        this._newValues = {};
        this._inputList.forEach((inputElement) => {
            this._newValues[inputElement.name] = inputElement.value;
        })
        return this._newValues;
    }

    showLoading(isLoading) {
      if (isLoading) {
          this._popupButton.textContent = 'Сохранение...';
      } else {
          this._popupButton.textContent = this._buttonText;
      }
    }
    // Добавляет обработчик клика иконке закрытия и обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
        });
    }

    //  Сбрасывает форму при закрытии
    close() {
        super.close();

        this._popupForm.reset();
    }
}
