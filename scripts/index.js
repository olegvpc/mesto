//  popup на корректировку profile
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

const cardsContainer = document.querySelector(".cards__list") // контейнер новой карточки с фото

const formElementAddPhoto = document.querySelector("#popup-form-add-photo"); // форма добавления фотографии
const formNamePhotoInput = formElementAddPhoto.querySelector("#popup-add-name-photo"); // поле ввода описания фото
const formLinkPhotoInput = formElementAddPhoto.querySelector("#link"); // поле ввода link на фотографию

const photoViewPopup = document.querySelector(".popup_show-img"); // popup открытия полноразмерного фото

// функции открытия и закрытия popup
const openPopup = popup => popup.classList.add("popup_opened") // открытие popup
const closePopup = popup => popup.classList.remove("popup_opened") // закрытие popup

// функции submit формы профайл
function handleSubmitProfileForm (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const editedValueName = formNameInput.value;
  const editedValueAbout = formAboutInput.value;

  document.querySelector(".profile__name").textContent = editedValueName; // присваивание введенных имени в DOM
  document.querySelector(".profile__about").textContent = editedValueAbout; // присваивание введенного описания профайла в DOM

  closePopup(profileEdit);
}
// функции submit формы добавления фото
function handleSubmitAddPhotoForm (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const namePhoto = formNamePhotoInput.value;
  const linkPhoto = formLinkPhotoInput.value;
  renderCard(namePhoto, linkPhoto)

  closePopup(photoAddPopup);
}
// функция открытия полноразмерного фото
function viewPhoto(link, title) {
  openPopup(photoViewPopup)

  photoViewPopup.querySelector(".popup__photo").src = link;
  photoViewPopup.querySelector(".popup__photo").alt = title;
  photoViewPopup.querySelector(".popup__image-title").textContent = title;
 }

 // Функция создания card в cards-list и просмотра фото включая слушатели like и delete
function createCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = title;
  cardElement.querySelector('.card__title').textContent = title;

  // подключение события на like
  cardElement.querySelector(".card__like").addEventListener("click", function (event) {
    event.target.classList.toggle("card__like_active");
  })

  // подключение события на delete-урну
  cardElement.querySelector(".card__delete-btn").addEventListener("click", () => cardElement.remove())

  // подключение события (только на картинку) на открытие полного фото
  cardElement.querySelector(".card__image").addEventListener("click", () => viewPhoto(link, title))
  return cardElement
}

function renderCard(title, link) {
  const newCard = createCard(title, link);
  cardsContainer.prepend(newCard)
}

// обработчики открытия и закрытия popup
profileEditBtn.addEventListener("click", () => openPopup(profileEdit)); // click для редактирования
profileEditBtnClose.addEventListener("click", () => closePopup(profileEdit)); // click для закрытия редактирования

photoAddBtn.addEventListener("click", () => openPopup(photoAddPopup)); // click для добавления фото
photoAddEditBtnClose .addEventListener("click", () => closePopup(photoAddPopup)) // click для закрытия добавления фото

// click для закрытия popup полноразмерного фото
photoViewPopup.querySelector(".popup__btn-close").addEventListener("click", () => closePopup(photoViewPopup));

formProfileElement.addEventListener('submit', handleSubmitProfileForm );
formElementAddPhoto.addEventListener('submit', handleSubmitAddPhotoForm);
// document.querySelector(".popup__btn-save").addEventListener('click', handleSubmitAddPhotoForm); // или так

// Начальное добавление 6 card из заготовленного массива initialCards
initialCards.forEach((item) => renderCard(item.name, item.link))
