//  popup на корректировку profile
const popups = document.querySelectorAll(".popup")
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профайла
const profileEdit = document.querySelector(".popup_type_profile"); // popup редактирования профайла
const profileEditBtnClose = document.querySelector("#popup-profile-btn-close"); // кнопка закрытия popup профайла

const formProfileElement = document.querySelector("#popup-form-profile"); // форма профайла
const formNameInput = formProfileElement.querySelector("#popup-name"); // поле имени профайла
const formAboutInput = formProfileElement.querySelector("#popup-about"); // поле описания профайла

//  popup на добавление фото
const photoAddBtn = document.querySelector(".profile__add-btn"); // кнопка добавления фотографии
const photoAddPopup = document.querySelector(".popup_type_add"); // popup добавления фотографии
const photoAddEditBtnClose = document.querySelector("#popup-add-photo-btn-close"); // кнопка закрытия popup add-photo

const cardsContainer = document.querySelector(".cards__list") // контейнер для карточек с фото

const formElementAddPhoto = document.querySelector("#popup-form-add-photo"); // форма добавления фотографии
const formNamePhotoInput = formElementAddPhoto.querySelector("#popup-add-name-photo"); // поле ввода описания фото
const formLinkPhotoInput = formElementAddPhoto.querySelector("#link"); // поле ввода link на фотографию

const photoViewPopup = document.querySelector(".popup_show-img"); // popup открытия полноразмерного фото

const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// закрытие всех popup при нажатии на Escape
function closePopupEscape (evt) {
  if (evt.key === "Escape") {
    popups.forEach(popup => closePopup(popup));
  };
};
// закрытие popup при Click на Overlay
function closePupupOverlay (evt) {
  const popup = evt.target;
  if (popup.classList.contains("popup")) {
    closePopup(popup)
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

  const editedValueName = formNameInput.value;
  const editedValueAbout = formAboutInput.value;

  document.querySelector(".profile__name").textContent = editedValueName; // присваивание введенных имени в DOM
  document.querySelector(".profile__about").textContent = editedValueAbout; // присваивание введенного описания профайла в DOM
  inactivateSubmitButton (event.target.querySelector(".popup__button"), dataValidation);
  closePopup(profileEdit);
}
// функции submit формы добавления фото
function handleSubmitAddPhotoForm (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const newCardData = {}
    newCardData.name = formNamePhotoInput.value;
    newCardData.link = formLinkPhotoInput.value;

    renderCard(cardsContainer, newCardData);
    event.target.reset(); // очищаем поля  input при отправке формы
    inactivateSubmitButton (event.target.querySelector(".popup__button"), dataValidation);
    closePopup(photoAddPopup);
}
// функция открытия полноразмерного фото
function viewPhoto(cardData) {
  photoViewPopup.querySelector(".popup__photo").src = cardData.link;
  photoViewPopup.querySelector(".popup__photo").alt = cardData.name;
  photoViewPopup.querySelector(".popup__image-title").textContent = cardData.name;
  openPopup(photoViewPopup);
 }
// функция обработчика like -сердечка для каждого Фото
function toggleLikeButton (evt) {
  evt.target.classList.toggle("card__like_active");
}

 // Функция создания card в cards-list и просмотра фото включая слушатели like и delete
function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // подключение события на like
  cardElement.querySelector(".card__like").addEventListener("click", toggleLikeButton);

  // подключение события на delete-урну
  cardElement.querySelector(".card__delete-btn").addEventListener("click", () => cardElement.remove());

  // подключение события (только на картинку) на открытие полного фото
  cardElement.querySelector(".card__image").addEventListener("click", () => viewPhoto(cardData));
  return cardElement
}

function renderCard(photoContainer, cardData) {
    const newCard = createCard(cardData);
    photoContainer.prepend(newCard);
  }

// обработчики открытия и закрытия popup

// click для редактирования профиля
profileEditBtn.addEventListener("click", () => {
  formNameInput.value = document.querySelector(".profile__name").textContent; // запись в поле формы значений из html
  formAboutInput.value = document.querySelector(".profile__about").textContent; // запись в поле формы значений из html

  openPopup(profileEdit);
});
profileEditBtnClose.addEventListener("click", () => closePopup(profileEdit)); // click для закрытия редактирования профиля

// click для добавления фото
photoAddBtn.addEventListener("click", () => {
  // formNamePhotoInput.value = ""; // очистка поля формы при открытии - при отправке input очищается reset
  // formLinkPhotoInput.value = ""; // очистка поля формы при открытии - при отправке input очищается reset
  openPopup(photoAddPopup);
});
photoAddEditBtnClose .addEventListener("click", () => closePopup(photoAddPopup)); // click для закрытия добавления фото

// click для закрытия popup полноразмерного фото
photoViewPopup.querySelector(".popup__btn-close").addEventListener("click", () => closePopup(photoViewPopup));

formProfileElement.addEventListener('submit', handleSubmitProfileForm );
formElementAddPhoto.addEventListener('submit', handleSubmitAddPhotoForm);

// Начальное добавление 6 card из заготовленного массива initialCards
initialCards.forEach((cardData) => renderCard(cardsContainer, cardData));
