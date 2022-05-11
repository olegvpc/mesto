const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// popup на корректировку profile

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEdit = document.querySelector(".popup_type_profile");
const profileEditBtnClose = document.querySelector("#popup-profile-btn-close");

const formProfileElement = document.querySelector("#popup-form-profile");

const formNameInput = formProfileElement.querySelector("#popup-name");
const formAboutInput = formProfileElement.querySelector("#popup-about");

profileEditBtn.addEventListener("click", editProfile);

function editProfile() {
  profileEdit.classList.add("popup_opened");
};

profileEditBtnClose.addEventListener("click", editProfileClose);

function editProfileClose() {
  profileEdit.classList.remove("popup_opened");
};

function formSubmitHandler (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let editedValueName = formNameInput.value;
    let editedValueAbout = formAboutInput.value;

    let newName = document.querySelector(".profile__name");
    let newAbout = document.querySelector(".profile__about");

    newName.textContent = editedValueName;
    newAbout.textContent = editedValueAbout;

    editProfileClose();
}

formProfileElement.addEventListener('submit', formSubmitHandler);

// document.querySelector(".popup__btn-save").addEventListener('click', formSubmitHandler); // или так

// Функция добавления фотографии в cards-list включая элементы like и delete и просмотр фото

const cardsContainer = document.querySelector(".cards__list")

function addCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = title;
  cardElement.querySelector('.card__title').textContent = title;

  // подключение события на like
  cardElement.querySelector(".card__like").addEventListener("click", function (event) {
    event.target.classList.toggle("card__like_active");
  })

  // подключение события на открытие фото (только картинку)
  cardElement.querySelector(".card__image").addEventListener("click", function () {

    const photoImage =  cardElement.querySelector(".card__image"); // элемент img
    const photoTitle = cardElement.querySelector(".card__title"); // элемент p - title

    const photoViewPopup = document.querySelector(".popup_show-img"); // создаем popup для просмотра фото
    photoViewPopup.classList.add("popup_opened");

    photoViewPopup.querySelector(".popup__photo").src = photoImage.src;
    photoViewPopup.querySelector(".popup__photo").alt = photoTitle.textContent;
    photoViewPopup.querySelector(".popup__image-title").textContent = photoTitle.textContent;

    photoViewPopup.querySelector(".popup__btn-close").addEventListener("click", () => photoViewPopup.classList.remove("popup_opened"))

  })

  // подключение события на delete
  cardElement.querySelector(".card__delete-btn").addEventListener("click", () => cardElement.remove())

  cardsContainer.prepend(cardElement);
}

// Начальное добавление 6 card из заготовленного массива initialCards

initialCards.forEach((item) => addCard(item.name, item.link))

// popup на добавление новой фотографии

const photoAddBtn = document.querySelector(".profile__add-btn"); // кнопка добавления фотографии
const photoAddPopup = document.querySelector(".popup_type_add"); // popup добавления фотографии
const photoAddEditBtnClose = document.querySelector("#popup-add-photo-btn-close"); // кнопка закрытия popup

const formElementAddPhoto = document.querySelector("#popup-form-add-photo");

const formNamePhotoInput = formElementAddPhoto.querySelector("#popup-add-name-photo");
const formLinkPhotoInput = formElementAddPhoto.querySelector("#link");

photoAddBtn.addEventListener("click", openPopupAddPhoto);
photoAddEditBtnClose .addEventListener("click", closePopupAddPhoto)

function openPopupAddPhoto() {
  photoAddPopup.classList.add("popup_opened");
};

function closePopupAddPhoto() {
  photoAddPopup.classList.remove("popup_opened");
};

function submitHandlerPhoto (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let namePhoto = formNamePhotoInput.value;
  let linkPhoto = formLinkPhotoInput.value;
  addCard(namePhoto, linkPhoto)


  closePopupAddPhoto();
}


formElementAddPhoto.addEventListener('submit', submitHandlerPhoto);

