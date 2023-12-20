import "../pages/index.css";
import { createCard, removeCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popupCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupFormImageView = document.querySelector(".popup_type_image");
const popupImage = popupFormImageView.querySelector(".popup__image");
const popupCaption = popupFormImageView.querySelector(".popup__caption");
const popups = Array.from(document.querySelectorAll(".popup"));

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupFormEditProfile = document.querySelector("#popup-form-edit");

const nameInput = popupFormEditProfile.querySelector(".popup__input_type_name");
const descriptionInput = popupFormEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const popupFormAddCard = document.querySelector("#popup-form-add");

const linkInput = document.querySelector(".popup__input_type_url");
const titleInput = document.querySelector(".popup__input_type_card-name");

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupProfile);
}
popupFormEditProfile.addEventListener("submit", handleFormEditSubmit);

buttonOpenPopupProfile.addEventListener("click", function () {
  openModal(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

buttonOpenPopupCard.addEventListener("click", function () {
  openModal(popupCard);
});

function addCard(link, name) {
  const card = createCard(
    { link: link, name: name },
    removeCard,
    likeCard,
    openPopupImage
  );
  placesList.prepend(card);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  addCard(linkInput.value, titleInput.value);
  popupFormAddCard.reset();
  closeModal(popupCard);
}

initialCards.forEach((item) => {
  const newCard = createCard(item, removeCard, likeCard, openPopupImage);
  placesList.append(newCard);
});

function openPopupImage(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;

  openModal(popupFormImageView);
}

popupFormAddCard.addEventListener("submit", handleFormAddSubmit);

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});
