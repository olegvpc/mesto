// import { viewPhoto } from "../../pages/index.js";
export default class Card {
  constructor ({ data, handleCardClick, handleCardDelete, handleLikeClick }, templateSelector, userId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCounter = this._cardElement.querySelector(".card__like-counter");
    this._cardDeleteBtn = this._cardElement.querySelector(".card__delete-btn");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    if (!(this._ownerId === this._userId)) {
      this._cardDeleteBtn.style.display = 'none';
    }
    // проверка есть ли уже мой лайк на карточке в базе
    if (this._hasLikeState ()) {
      this._cardLikeBtn.classList.add("card__like_active")
    }
    this._setEventListeners();


    return this._cardElement;
  }
  deleteCard () {
    this._cardElement.remove();
    this._element = null;
  }

  _hasLikeState () {
    return this._likes.some(like => like._id ===this._userId)
  }

  _updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if((this._hasLikeState())) {
      this._cardLikeBtn.classList.add("card__like_active");
    } else {
      this._cardLikeBtn.classList.remove("card__like_active");
    }
  }
  updateLikes(likes) {
    this._likes = likes;
    this._updateLikesView()
  }
  // формируем слушатели на карте: preview-full-size + like + delete
  _setEventListeners () {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data)
  });
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLikeClick(this._hasLikeState(), this._id);
    })

    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleCardDelete(this._id) // удаление карточки на сервере через API
    });
  }
}
