// Управление отображением информации о пользователе на странице
export default class UserInfo {

  constructor({ nameSelector, aboutSelector }) {
      this._userName = document.querySelector(nameSelector);
      this._userAbout = document.querySelector(aboutSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
      this._userData = {
          name: this._userName.textContent,
          about: this._userAbout.textContent
      }
      return this._userData;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
      this._userName.textContent = userData.name;
      this._userAbout.textContent = userData.about;
  }
}
