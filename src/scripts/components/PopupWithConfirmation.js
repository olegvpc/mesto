import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupButton = this._popupForm.querySelector('.popup__button');
        this._buttonText = this._popupButton.textContent; // сохранение начальной надписи на кнопке
    }
    // в action колбэк функция, кторая запустится при Submit формы
    setSubmitAction(action) {
      this._handleSubmitCallback = action;
    }
    showLoading(isLoading) {
      if (isLoading) {
          this._popupButton.textContent = 'Сохранение...';
      } else {
          this._popupButton.textContent = this._buttonText;
      }
    }
    setEventListeners() {
      super.setEventListeners();

      this._popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          // console.log("должна удаляться карточка");
          this._handleSubmitCallback() // запуск фунции пришедшей колбэком в setSubmitAction

      });
  }
}
