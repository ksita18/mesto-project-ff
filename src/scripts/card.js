// функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

import { apiRequest } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, ownerId) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  const img = cardItem.querySelector(".card__image");
  img.src = cardData.card.link;
  img.alt = cardData.card.name;

  img.addEventListener("click", () => cardData.openModalImg(img, title));

  const title = cardItem.querySelector(".card__title");
  title.textContent = cardData.card.name;

  const likeBtn = cardItem.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () =>
    likeCard(cardData.card, likeBtn, likeCount)
  );

  const likeCount = cardItem.querySelector(".card__like-count");
  likeCount.textContent =
    cardData.card.likes.length === 0 ? "0" : cardData.card.likes.length;
  if (
    cardData.card.likes.some((like) => {
      return like._id === ownerId;
    })
  ) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  if (cardData.card.owner._id !== ownerId) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener("click", () => {
      deleteCard(cardData.card);
      cardItem.remove();
    });
  }
  return cardItem;
}

// Удаление карточки
export function deleteCard(card) {
  apiRequest({
    url: `cards/${card._id}`,
    method: "DELETE",
  }).catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  });
}

// Лайк карточки
export function likeCard(card, likeBtn, likeCount) {
  if (likeBtn.classList.contains("card__like-button_is-active")) {
    apiRequest({
      url: `cards/likes/${card._id}`,
      method: "DELETE",
    })
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likeCount.textContent = res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  } else {
    apiRequest({
      url: `cards/likes/${card._id}`,
      method: "PUT",
    })
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likeCount.textContent = res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  }
}
