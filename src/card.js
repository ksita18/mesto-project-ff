// функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// @todo: Функция создания карточки
import { openModalImg } from "./index";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const img = cardItem.querySelector(".card__image");
  img.src = card.link;
  img.alt = card.name;
  const title = cardItem.querySelector(".card__title");
  title.textContent = card.name;

  const likeBtn = cardItem.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => likeCard(likeBtn));

  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", () => deleteCard(cardItem));

  img.addEventListener("click", () => openModalImg(img, title));

  return cardItem;
}

// Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// Лайк карточки
export function likeCard(like) {
  like.classList.toggle("card__like-button_is-active");
}
