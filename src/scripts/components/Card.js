// import { viewPhoto } from "../../pages/index.js";
export default class Card {
  constructor ({ data, handleCardClick }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  // создание клона новой Card из шаблона
  _getTemplate () {
    return document.querySelector(this._templateSelector)
    .content.querySelector(".cards__item")
    .cloneNode(true);
  }

  generateCard () {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardLikeBtn = this._cardElement.querySelector(".card__like");
    this._cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
  _deleteCard () {
    this._cardElement.remove();
    this._element = null;
  }
  _toggleLikeButton() {
    this._cardLikeBtn.classList.toggle("card__like_active");
  }
  // формируем слушатели на карте - like - delete - preview-full-size
  _setEventListeners () {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data)
  });
    this._cardLikeBtn.addEventListener("click", () => this._toggleLikeButton());
    this._cardDeleteBtn.addEventListener("click", () => this._deleteCard());
  }
}
