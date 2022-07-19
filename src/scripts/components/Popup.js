export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
  }

  // Открытие popup
  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие popup
  close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие клавишей ESC
  _handleEscClose = (evt) => {
      // console.log(evt.keyCode)
      if (evt.key === 'Escape') {
          this.close();
      }
  }

  // Установка слушателей
  // "click" отрабатывает некорректно - ведь слушатель установлен на весь popup - а там ВСПЛЫТИЕ
  // попап закрывается если, например, выделять текст в поле мышью и вынести курсор за границы попапа
  // click должен вызывается при mousedown , а затем mouseup над одним и тем же элементом, если использовалась левая кнопка мыши.
  setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
              this.close();
          }
      });
  }
}
