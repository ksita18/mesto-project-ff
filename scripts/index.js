// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCards(card, deleteCard) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__title').textContent = card.name;
  cardItem.querySelector('.card__image').alt = card.name;
  const deleteCardButton = cardItem.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', () => {deleteCard(cardItem);});
  return cardItem;
}
// @todo: Функция удаления карточки
function deleteCard(cardItem) {
    cardItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const cardElement = createCards(card, deleteCard);
    cardContainer.append(cardElement);
});