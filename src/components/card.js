// @todo: Темплейт карточки
const content = document.querySelector("#card-template").content,
  templateCard = content.querySelector(".card");

// @todo: Функция создания карточки
const createCard = function (item, removeCard, likeCard, openPopupImage) {
  const newCard = templateCard.cloneNode(true),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title"),
    deleteButton = newCard.querySelector(".card__delete-button"),
    likeButton = newCard.querySelector(".card__like-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", removeCard);
  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", function () {
    openPopupImage(item);
  });

  return newCard;
};

function removeCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, likeCard };
