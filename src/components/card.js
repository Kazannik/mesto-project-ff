import { addLike, deleteLike } from "./api.js";

// @todo: Темплейт карточки
const content = document.querySelector("#card-template").content,
  templateCard = content.querySelector(".card");

// @todo: Функция создания карточки
const createCard = function (
  item,
  userId,
  removeCard,
  likeCard,
  openPopupImage
) {
  const newCard = templateCard.cloneNode(true),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title"),
    deleteButton = newCard.querySelector(".card__delete-button"),
    likeButton = newCard.querySelector(".card__like-button"),
    cardLikeCount = newCard.querySelector(".card__like-count");

  newCard.id = item["_id"];

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;
  cardLikeCount.textContent = item.likes.length;

  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (item.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) => {
      removeCard(evt, item._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, item._id);
  });

  cardImage.addEventListener("click", function () {
    openPopupImage(item);
  });

  return newCard;
};

const likeCard = (evt, cardId) => {
  const currentLikes = evt.target.parentNode.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { createCard, likeCard };
