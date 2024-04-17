// описана инициализация приложения и основная логика страницы:
// поиск DOM-элементов на странице и навешивание на них обработчиков событий;
// обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; <
// функция открытия модального окна изображения карточки.
// код, который отвечает за отображение шести карточек при открытии страницы. <

import "../pages/index.css";
import "../images/logo.svg";
import "../images/avatar.jpg";
import { createCard } from "./card";
import { initialCards } from "./cards";
import {
  openPopupWindow,
  closePopupWindow,
  closePopupByCross,
  closePopupOverlay,
} from "./modal";

const cardContainer = document.querySelector(".places__list");

const editBtn = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const addBtn = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

const formEditProfile = document.forms["edit-profile"];
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formNewCard = document.forms["new-place"];
const nameCardInput = formNewCard.elements["place-name"];
const linkCardInput = formNewCard.elements.link;

const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupImgCaption = popupTypeImg.querySelector(".popup__caption");

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, openModalImg);
  cardContainer.append(cardElement);
});

// открытие модального окна редактирования профиля
editBtn.addEventListener("click", () => {
  openPopupWindow(popupTypeEdit);
  fillFormEditProfile();
});

//открытие модального окна добавления карточки
addBtn.addEventListener("click", () => {
  openPopupWindow(popupTypeNewCard);
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

// Обработчик «отправки» формы заполнения инфо профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileDescription.textContent = jobProfileInput.value;
  profileTitle.textContent = nameProfileInput.value;
  closePopupWindow(popupTypeEdit);
}
formEditProfile.addEventListener("submit", handleFormSubmitProfile);

// Автозаполнение полей
function fillFormEditProfile() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

// Добавление новой карточки
function addNewCard(newCard) {
  cardContainer.prepend(newCard);
}

// Обработчик «отправки» формы добавления карточки
function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = { name: nameCardInput.value, link: linkCardInput.value };
  addNewCard(createCard(newCardData, openModalImg));
  formNewCard.reset();
  closePopupWindow(popupTypeNewCard);
}
formNewCard.addEventListener("submit", handleFormAddNewCardSubmit);
