// описана инициализация приложения и основная логика страницы:
// поиск DOM-элементов на странице и навешивание на них обработчиков событий;
// обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; <
// функция открытия модального окна изображения карточки.
// код, который отвечает за отображение шести карточек при открытии страницы. <

import "../pages/index.css";
import "../images/logo.svg";
import "../images/avatar.jpg";
import { createCard, likeCard } from "./card";
import {
  openPopupWindow,
  closePopupWindow,
  closePopupByCross,
  closePopupOverlay,
} from "./modal";
import {
  enableValidation,
  validationSettings,
  clearValidation,
} from "./validation";
import {
  getUserInfo,
  getInitialCards,
  editProfileInfo,
  addNewCard,
  changeUserAvatar,
} from "./api";
import { renderLoading } from "./utils";

const cardContainer = document.querySelector(".places__list");

const editBtn = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const addBtn = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const formEditProfile = document.forms["edit-profile"];
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

const profileInfo = document.querySelector(".profile__info");
const profileImage = document.querySelector(".profile__image");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

const formNewCard = document.forms["new-place"];
const nameCardInput = formNewCard.elements["place-name"];
const linkCardInput = formNewCard.elements.link;

const formAvatar = document.forms["avatar"];
const linkInputAvatar = formAvatar.elements["avatar-link"];

const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupImgCaption = popupTypeImg.querySelector(".popup__caption");

enableValidation(validationSettings);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([dataCards, dataProfile]) => {
    setInfoProfile(dataProfile);
    setInfoCards(dataCards, dataProfile._id);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  });

function setInfoProfile(res) {
  profileInfo.dataset.userId = res._id;
  profileImage.style.backgroundImage = `url(${res.avatar})`;
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
}

function setInfoCards(res, ownerId) {
  res.forEach((card) => {
    cardContainer.append(
      createCard({ card: card, openModalImg, likeCard }, ownerId)
    );
  });
}

// Обработчик отправки формы заполнения инфо профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const saveButtonProfile = formEditProfile.querySelector(".button");
  renderLoading(saveButtonProfile, true);
  editProfileInfo(nameProfileInput.value, jobProfileInput.value)
    .then((res) => {
      setInfoProfile(res);
      closePopupWindow(popupTypeEdit);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonProfile, false);
    });
}
formEditProfile.addEventListener("submit", handleFormSubmitProfile);

// Обработчик отправки формы добавления карточки
function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();

  const saveButtonNewCard = formNewCard.querySelector(".button");
  renderLoading(saveButtonNewCard, true);
  addNewCard(nameCardInput.value, linkCardInput.value)
    .then((card) => {
      cardContainer.prepend(
        createCard(
          { card: card, openModalImg, likeCard },
          profileInfo.dataset.userId
        )
      );
      formNewCard.reset();
      closePopupWindow(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonNewCard, false);
    });
}
formNewCard.addEventListener("submit", handleFormAddNewCardSubmit);

// Обработчик отправки формы нового аватара
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  const saveButtonAvatar = formAvatar.querySelector(".button");
  renderLoading(saveButtonAvatar, true);
  changeUserAvatar(linkInputAvatar.value)
    .then((res) => {
      setInfoProfile(res);
      closePopupWindow(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonAvatar, false);
    });
}
formAvatar.addEventListener("submit", handleFormSubmitAvatar);

// открытие модального окна редактирования профиля
editBtn.addEventListener("click", () => {
  openPopupWindow(popupTypeEdit);
  fillFormEditProfile();
  clearValidation(formEditProfile, validationSettings);
});

//открытие модального окна добавления карточки
addBtn.addEventListener("click", () => {
  openPopupWindow(popupTypeNewCard);
  clearValidation(formNewCard, validationSettings);
});

//открытие модального окна обновления аватара профиля
profileImage.addEventListener("click", () => {
  openPopupWindow(popupTypeAvatar);
  clearValidation(formAvatar, validationSettings);
});

// закрытие модальных окон по клику на Esc и крестик
popups.forEach((element) =>
  element.addEventListener("click", closePopupOverlay)
);
popups.forEach((element) =>
  element.addEventListener("click", closePopupByCross)
);

// Анимирование попапов
popups.forEach((element) => element.classList.add("popup_is-animated"));

// функция открытия модального окна изображения карточки
function openModalImg(img, title) {
  popupImg.src = img.src;
  popupImg.alt = img.alt;
  popupImgCaption.textContent = title.textContent;
  openPopupWindow(popupTypeImg);
}

// Автозаполнение полей
function fillFormEditProfile() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
}
