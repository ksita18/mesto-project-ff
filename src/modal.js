// функции для работы с модальными окнами:
// функция открытия модального окна, функция закрытия модального окна,
// функция-обработчик события нажатия Esc и
// функция-обработчик события клика по оверлею;

// функция открытия модального окна
export function openPopupWindow(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEscBtn);
}

// функция закрытия модального окна
export function closePopupWindow(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEscBtn);
}

// функция закрытия модального окна по кнопке Escape
export function closePopupWithEscBtn(evt) {
  if (evt.key === "Escape" || evt.keyCode === 27) {
    closePopupWindow(document.querySelector(".popup_is-opened"));
  }
}

// функция закрытия модального окна клик по оверлею
export function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopupWindow(evt.target);
  }
}

// функция закрытия модального окна клик по крестику
export function closePopupByCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopupWindow(evt.target.closest(".popup"));
  }
}
