const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEdit = document.querySelector(".popup");
const profileEditBtnClose = document.querySelector(".popup__btn-close");

const formElement = document.querySelector(".popup__form");

const formNameInput = formElement.querySelector("#popup-name");
const formAboutInput = formElement.querySelector("#popup-about");

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

formElement.addEventListener('submit', formSubmitHandler);
