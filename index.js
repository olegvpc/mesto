const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEdit = document.querySelector(".popup_profile");
const profileEditBtnClose = document.querySelector(".popup__btn-close");

const formElement = document.querySelector(".popup__form");

const formNameInput = formElement.querySelector("#popup-name");
const formAboutInput = formElement.querySelector("#popup-about");

profileEditBtn.addEventListener("click", EditProfile);

function EditProfile() {
  // console.log("HELLO");
  profileEdit.classList.add("popup_opened");
};

profileEditBtnClose.addEventListener("click", EditProfileClose);

function EditProfileClose() {
  // console.log("BUY");
  profileEdit.classList.remove("popup_opened");
};

function formSubmitHandler (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let editedValueName = formNameInput.value;
    let editedValueAbout = formAboutInput.value;

    let newName = document.querySelector(".profile__name");
    let newAbaut = document.querySelector(".profile__about");

    newName.textContent = editedValueName;
    newAbaut.textContent = editedValueAbout;
}

formElement.addEventListener('submit', formSubmitHandler);
