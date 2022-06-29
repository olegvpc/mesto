import "./index.css"; // Импорт нужен для webpack

import { initialCards } from "../scripts/utils/cards.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";

const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профайла

const formProfileElement = document.querySelector("#popup-form-profile"); // форма профайла
const formNameInput = formProfileElement.querySelector("#popup-name"); // поле имени профайла
const formAboutInput = formProfileElement.querySelector("#popup-about"); // поле описания профайла

const photoAddBtn = document.querySelector(".profile__add-btn"); // кнопка добавления фотографии

const formElementAddPhoto = document.querySelector("#popup-form-add-photo"); // форма добавления фотографии

const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// создание экземпляра для формы редактирования профиля
const profileValid = new FormValidator(dataValidation, formProfileElement);
// создание экземпляра для формы добавления фото
const cardElementValid = new FormValidator(dataValidation, formElementAddPhoto);


const popupWithImage = new PopupWithImage('.popup_show-img');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

// экземпляр popup редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_profile', (userData) => {
  const newUser = {}
  newUser.name = userData["new-name"];
  newUser.about = userData["new-about"];
  userInfo.setUserInfo(newUser)
  popupEditProfile.close()

});
// экземпляр popup добавления фото
const popupAddPhoto = new PopupWithForm('.popup_type_add', (photoData) => {
  console.log(photoData)
  // создание экземпляра карточки и генерация данных в него
  const card = new Card({
    data: photoData,
    handleCardClick: (cardData) => {
      popupWithImage.open(cardData)
    }
  }, "#card-template");
  const cardElement = card.generateCard();
  // использование созданного экземпляра вставки разметки
  cardList.addItem(cardElement);

  popupAddPhoto.close()
})

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: (cardData) => {
          popupWithImage.open(cardData)
        }
      }, "#card-template");
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    }
  }, ".cards__list");

// click для редактирования профиля
profileEditBtn.addEventListener("click", () => {
  const {name, about} = userInfo.getUserInfo();
  formNameInput.value = name;
  formAboutInput.value = about;
  profileValid.resetValidation(); // при откратии popup очищает ошибки валидации
  profileValid.inactiveButtonSubmit(); // при открытии popup делает кнопку неактивной, чтобы нельзы было сохранить, если нет изменений формы

  popupEditProfile.open();
});

// click для добавления фото
photoAddBtn.addEventListener("click", () => {
  cardElementValid.resetValidation();
  // openPopup(photoAddPopup);
  popupAddPhoto.open();
});

// Начальное добавление 6 card из заготовленного массива initialCards
cardList.renderItems();

// запуск слушателей
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPhoto.setEventListeners();

// Валидация
profileValid.enableValidation();
cardElementValid.enableValidation();
