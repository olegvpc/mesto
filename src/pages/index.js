import "./index.css"; // Импорт нужен для webpack

// import { initialCards } from "../scripts/utils/cards.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";

const avatarEditButton = document.querySelector('.profile__avatar-btn')
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профайла

const formProfileElement = document.querySelector("#popup-form-profile"); // форма профайла
const formElementAddPhoto = document.querySelector("#popup-form-add-photo"); // форма добавления фотографии
const formElementAvatar = document.querySelector("#popup-form-avatar")

const formNameInput = formProfileElement.querySelector("#popup-name"); // поле имени профайла
const formAboutInput = formProfileElement.querySelector("#popup-about"); // поле описания профайла

const photoAddBtn = document.querySelector(".profile__add-btn"); // кнопка добавления фотографии

const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// создание экземпляра для валидации формы редактирования профиля
const profileValid = new FormValidator(dataValidation, formProfileElement);
// создание экземпляра для валидации формы добавления фото
const cardElementValid = new FormValidator(dataValidation, formElementAddPhoto);
// создание экземпляра для валидации формы аватара
const avatarValid = new FormValidator(dataValidation, formElementAvatar);


const popupWithImage = new PopupWithImage('.popup_show-img');
const popupConfirm = new PopupWithConfirm('.popup_type_delete');


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  userAvatar: '.profile__avatar',
});

// экземпляр для API запроса на сервер

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'c6ae09bb-60e1-4878-abd8-c5707855c0f1',
    'Content-Type': 'application/json'
  }
});

let userId = null

// стучимся на сервер за данными пользователя
api.getUserInfo()
  .then(userData => {
    // console.log(userData); // начальная загрузка данных пользователя с сервера
    userInfo.setUserInfo(userData)
    userId = userInfo.getUserId()
    // console.log(userId)
  })
  .catch((err) => {
    console.log(err);
  })

// стучимся на сервер за карточками
api.getInitialCards()
  .then(cards => {
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// функция создания элемента карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (cardData) => {
      popupWithImage.open(cardData)
    },
    handleCardDelete: (id) => {
      popupConfirm.open(); // открываем popup одобрения для удаления

      popupConfirm.setSubmitAction(() => {
        api.deleteCard(id)
        .then(() => {
          card.deleteCard();
          popupConfirm.close();
        })

      })

    },
    handleLikeClick: (isLike, cardId) => {
      if (isLike) {
        api.dislikeCard(cardId)
        .then(() => card.toggleLikeButton())
        .catch((error) => console.log(`Ошибка ${error} при удалении лайка`))
      } else {
        api.likeCard(cardId)
        .then(() => card.toggleLikeButton())
        .catch((error) => console.log(`Ошибка ${error} при удалении лайка`))
      };
    }
  }, "#card-template", userId);
  return card.generateCard();
}

// Обновление Аватара профиля
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', (values) => {
  popupAvatarEdit.showLoading(true);
  api.updateUserAvatar(values) // отпрвим данные на сервер (values = inpup из popup)
      .then((data) => {
        userInfo.setUserInfo(data); // ответ с сервера (data = полные данные профиля)
        avatarValid.resetValidation();
        popupAvatarEdit.close();
      })
      .catch((err) => {
          console.log(err);
      })
      .finally(() => {
        popupAvatarEdit.showLoading(false);
      })
});

// экземпляр popup редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_profile', (userData) => {
  // console.log(userData) // данные из input нужно преобразовать {new-name: 'Oleg Tkkhjvj', new-about: 'Progra'}
  popupEditProfile.showLoading(true)
  api.setUserInfo({
    name : userData["new-name"],
    about: userData["new-about"]
    })
    .then(newUser => {
      // console.log(newUser) // получен ответ с сервера - данные загружены
      userInfo.setUserInfo(newUser);
      popupEditProfile.close()
  })
    .catch(error => console.log(error))
    .finally(() => {
      popupEditProfile.showLoading(false);
    })
});

// экземпляр popup добавления фото
const popupAddPhoto = new PopupWithForm('.popup_type_add', (inputData) => {
  // console.log(inputData) // тут неполные данные {name: 'post', link: 'https://..ompressed/baikal.jpg'}
  popupAddPhoto.showLoading(true);
  api.addUserCard(inputData)
    .then(cardData => {
      // console.log(cardData); // ответ API с полными данными карточки {likes:, _id:, owner, name:, link:,...}
      const cardElement = createCard(cardData);
      // использование возвращенного с API экземпляра вставки в разметку
      cardList.addItem(cardElement);
      popupAddPhoto.close()
    })
    .finally(() => {
      popupAddPhoto.showLoading(false);
    })
})

// экземпляр для создания элемениа карточки с встраивания ее в DOM
const cardList = new Section({
  // items: initialCards, // данные начальных карточек передаются при вызове cardList.renderItems(initialCards);
  renderer: (item) => {
      const cardElement = createCard(item);
      cardList.appendItem(cardElement);
    }
  }, ".cards__list");

// click для редактирования аватара
avatarEditButton.addEventListener("click", () => {
  avatarValid.resetValidation();
  avatarValid.inactiveButtonSubmit();

  popupAvatarEdit.open();
})

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
// cardList.renderItems(initialCards);

// запуск слушателей
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPhoto.setEventListeners();
popupConfirm.setEventListeners();
popupAvatarEdit.setEventListeners();

// Валидация
profileValid.enableValidation();
cardElementValid.enableValidation();
avatarValid.enableValidation();
