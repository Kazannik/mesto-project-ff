import "../pages/index.css";
import { createCard, removeCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal, handleOverlayClose } from "./modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popupCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupFormImageView = document.querySelector(".popup_type_image");
const popupImage = popupFormImageView.querySelector(".popup__image");
const popupCaption = popupFormImageView.querySelector(".popup__caption");
const allPopups = Array.from(document.querySelectorAll(".popup"));

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = document.querySelector("#close-button-profile");
const popupFormEditProfile = document.querySelector("#popup-form-edit");

const nameInput = popupFormEditProfile.querySelector(".popup__input_type_name");
const descriptionInput = popupFormEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonClosePopupCard = document.querySelector("#close-button-card");
const popupFormAddCard = document.querySelector("#popup-form-add");

const buttonClosePopupImage = document.querySelector("#close-button-image");
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

buttonClosePopupProfile.addEventListener("click", function () {
  closeModal(popupProfile);
});

buttonOpenPopupCard.addEventListener("click", function () {
  openModal(popupCard);
});
buttonClosePopupCard.addEventListener("click", function () {
  closeModal(popupCard);
});

function addCard(link, name) {
  const card = createCard({ link:link, name:name }, removeCard, likeCard, openPopupImage);
  placesList.prepend(card);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  addCard(linkInput.value, titleInput.value);
  popupFormAddCard.reset();
  closeModal(popupCard);
}

initialCards.forEach((item) => {
  const newCard = createCard(
    item,
    removeCard,
    likeCard,
    openPopupImage
  );
  placesList.append(newCard);
});

function openPopupImage(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;

  openModal(popupFormImageView);
}

buttonClosePopupImage.addEventListener("click", function () {
  closeModal(popupFormImageView);
});
popupFormAddCard.addEventListener("submit", handleFormAddSubmit);

allPopups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClose);
});


