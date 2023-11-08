// @todo: Темплейт карточки
const content = document.querySelector("#card-template").content,
  templateCard = content.querySelector(".card");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = function (item) {
  const newCard = templateCard.cloneNode(true),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title"),
    deleteButton = newCard.querySelector(".card__delete-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", removeCard);

  return newCard;
};

// @todo: Функция удаления карточки
function removeCard(evt) {
  const target = evt.target,
    card = target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const newCard = createCard(item);
  placesList.append(newCard);
});
