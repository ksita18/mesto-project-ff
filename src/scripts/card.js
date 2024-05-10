// функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

import { deleteCardServer, addLike, removeLike } from "./api";

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
      deleteCardServer(cardData.card)
        .then((res) => {
          cardItem.remove();
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошибка: ${err}`);
        });
    });
  }
  return cardItem;
}

// Лайк карточки
export function likeCard(card, likeBtn, likeCount) {
  if (likeBtn.classList.contains("card__like-button_is-active")) {
    removeLike(card)
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likeCount.textContent = res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  } else {
    addLike(card)
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likeCount.textContent = res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  }
}
