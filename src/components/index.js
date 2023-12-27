import "../pages/index.css";
import { createCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialUser,
  updateUser,
  updateUserAvatar,
  getInitialCards,
  addCard,
  deleteCard,
} from "./api.js";

// @todo: DOM узлы
const popups = Array.from(document.querySelectorAll(".popup"));

const placesList = document.querySelector(".places__list");

const popupCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupConfirm = document.querySelector(".popup_type_confirm");

const popupFormEditProfile = document.forms["edit-profile"];
const popupFormEditAvatar = document.forms["edit-avatar"];
const popupFormAddCard = document.forms["new-place"];

const popupFormImageView = document.querySelector(".popup_type_image");

const popupImage = popupFormImageView.querySelector(".popup__image");
const popupCaption = popupFormImageView.querySelector(".popup__caption");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");

const buttonEditAvatar = document.querySelector(".profile__image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonConfirmAccept = popupConfirm.querySelector(
  ".confirm_accept__button"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId;

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const confirmDeleteCard = (evt, cardId) => {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

const handleConfirmDeleteCard = async (evt) => {
  deleteCard(popupConfirm.dataset.cardId)
    .then((res) => {
      const card = document.getElementById(popupConfirm.dataset.cardId);
      card.remove();
      popupConfirm.dataset.cardId="";
      closeModal(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
};
buttonConfirmAccept.addEventListener("click", handleConfirmDeleteCard);

const handleFormEditSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupFormEditProfile.querySelector(".popup__button"));
  updateUser({
    name: popupFormEditProfile.name.value,
    about: popupFormEditProfile.description.value,
  })
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        popupFormEditProfile.querySelector(".popup__button")
      );
    });
};
popupFormEditProfile.addEventListener("submit", handleFormEditSubmit);

buttonOpenPopupProfile.addEventListener("click", function () {
  clearValidation(popupFormEditProfile, validationConfig);
  popupFormEditProfile.elements.name.value = profileName.textContent;
  popupFormEditProfile.elements.description.value =
    profileDescription.textContent;
  openModal(popupProfile);
});

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupFormEditAvatar.querySelector(".popup__button"));
  updateUserAvatar(popupFormEditAvatar.link.value)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupFormEditAvatar.querySelector(".popup__button"));
    });
};
popupFormEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

buttonEditAvatar.addEventListener("click", (evt) => {
  clearValidation(popupFormEditAvatar, validationConfig);
  popupFormEditAvatar.reset();
  openModal(popupAvatar);
});

const handleAddCardFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupCard.querySelector(".popup__button"));

  const name = popupFormAddCard.elements.name.value;
  const link = popupFormAddCard.elements.link.value;
  addCard({ name, link })
    .then((card) => {
      const newCard = createCard(
        card,
        userId,
        confirmDeleteCard,
        likeCard,
        openPopupImage
      );
      placesList.prepend(newCard);
      closeModal(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupFormAddCard.querySelector(".popup__button"));
    });
};
popupFormAddCard.addEventListener("submit", handleAddCardFormSubmit);

buttonOpenPopupCard.addEventListener("click", function () {
  clearValidation(popupFormAddCard, validationConfig);
  popupFormAddCard.reset();
  openModal(popupCard);
});

function openPopupImage(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(popupFormImageView);
}

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

// Загрузка аватара и карточек
Promise.all([getInitialUser(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    initialCards.forEach((card) => {
      const newCard = createCard(
        card,
        userId,
        confirmDeleteCard,
        likeCard,
        openPopupImage
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
