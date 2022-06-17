import { initialCards } from "./utils/cards.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";


//  popup на корректировку profile
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профайла
const profileEdit = document.querySelector(".popup_type_profile"); // popup редактирования профайла
const currentProfileName = document.querySelector(".profile__name");
const currentProfileAbout = document.querySelector(".profile__about");

const formProfileElement = document.querySelector("#popup-form-profile"); // форма профайла
const formNameInput = formProfileElement.querySelector("#popup-name"); // поле имени профайла
const formAboutInput = formProfileElement.querySelector("#popup-about"); // поле описания профайла

//  popup на добавление фото
const photoAddBtn = document.querySelector(".profile__add-btn"); // кнопка добавления фотографии
const photoAddPopup = document.querySelector(".popup_type_add"); // popup добавления фотографии

const cardsContainer = document.querySelector(".cards__list") // контейнер для карточек с фото

const formElementAddPhoto = document.querySelector("#popup-form-add-photo"); // форма добавления фотографии
const formNamePhotoInput = formElementAddPhoto.querySelector("#popup-add-name-photo"); // поле ввода описания фото
const formLinkPhotoInput = formElementAddPhoto.querySelector("#link"); // поле ввода link на фотографию

const photoViewPopup = document.querySelector(".popup_show-img"); // popup открытия полноразмерного фото
const photoViewImage = photoViewPopup.querySelector(".popup__photo"); // фото на полноразмерном popup
const photoViewName = photoViewPopup.querySelector(".popup__image-title"); // описание к фото на полноразмерном popup

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

// закрытие всех popup при нажатии на Escape
function closePopupEscape (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); // спасибо - я все не мог понять как отловить нужный popup
    // а он ведь один :-)
    closePopup(openedPopup);
  };
};
// закрытие popup при Click на Overlay
function closePupupOverlay (evt) {
  const pushedElement = evt.target;
  const openedPopup = document.querySelector(".popup_opened")
  if (pushedElement.classList.contains("popup") || pushedElement.classList.contains("popup__btn-close")) {
    closePopup(openedPopup)
    };
};

// функции открытия и закрытия popup
const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("click", closePupupOverlay);
};
const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
  popup.removeEventListener("click", closePupupOverlay);
};

// функции submit формы профайл
function handleSubmitProfileForm (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы (Enter на input или click на button.submit)

  currentProfileName.textContent = formNameInput.value;
  currentProfileAbout.textContent = formAboutInput.value;

  closePopup(profileEdit);
}
// функции submit формы добавления фото
function handleSubmitAddPhotoForm (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const newCardData = {}
    newCardData.name = formNamePhotoInput.value;
    newCardData.link = formLinkPhotoInput.value;

    renderCard(cardsContainer, newCardData);
    formElementAddPhoto.reset();
    closePopup(photoAddPopup);
}
// только создание новой карточки из класса
function createCard (cardData) {
  const newCard = new Card(cardData, "#card-template");
  return newCard.generateCard();
}
// рендеринг карточки
function renderCard(photoContainer, cardData) {
  const newCard = createCard(cardData);
  photoContainer.prepend(newCard);
}
// функция открытия полноразмерного фото
export const viewPhoto = (cardData) => {
  photoViewImage.src = cardData.link;
  photoViewImage.alt = cardData.name;
  photoViewName.textContent = cardData.name;
  openPopup(photoViewPopup);
 }
// click для редактирования профиля
profileEditBtn.addEventListener("click", () => {
  formNameInput.value = currentProfileName.textContent; // запись в поле формы значений из html
  formAboutInput.value = currentProfileAbout.textContent; // запись в поле формы значений из html

  profileValid.resetValidation(); // при откратии popup очищает ошибки валидации
  profileValid.inactiveButtonSubmit(); // при открытии popup делает кнопку неактивной, чтобы нельзы было сохранить, если нет изменений формы

  openPopup(profileEdit);
});

// click для добавления фото
photoAddBtn.addEventListener("click", () => {
  cardElementValid.resetValidation();
  openPopup(photoAddPopup);
});

formProfileElement.addEventListener('submit', handleSubmitProfileForm );
formElementAddPhoto.addEventListener('submit', handleSubmitAddPhotoForm);

// Начальное добавление 6 card из заготовленного массива initialCards
initialCards.forEach((cardData) => renderCard(cardsContainer, cardData));

// Валидация
profileValid.enableValidation();
cardElementValid.enableValidation();
