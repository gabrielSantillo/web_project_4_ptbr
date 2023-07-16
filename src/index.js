import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupEditProfileImage from "./components/PopupEditProfileImage.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import {
  cardElement,
  addPost,
  openPopup,
  listOfClasses,
  popupSaveButton,
  savePostButton,
  userProfileImage,
  saveUserImageProfileButton,
  popupDeletePostIcon,
  closeButtonPopupDeletePost,
  baseApi,
  section
} from "./utils/utils.js";

import Api from "./components/Api.js";

import "./pages/index.css";

export const api = new Api({
  baseUrl: baseApi.url,
  headers: {
    authorization: baseApi.authorization,
    "Content-Type": baseApi.contentType,
  },
});

const popupWithImage = new PopupWithImage(".image__container");

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-about",
  imageSelector: "#profile-image",
});


api
  .getUserInfo("users/me")
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
      image: data.avatar,
      id: data._id
    });
  })
  .catch((error) => {
    console.error("Error getting the user info:", error);
  });

closeButtonPopupDeletePost.addEventListener("click", () => {
  popupDeletePostIcon.classList.remove("popup-opened");
});

function handleDeleteCard(cardId) {
  const popupWithConfirmation = new PopupWithConfirmation(
    "#delete-card-container",
    api.deleteCard("cards", cardId)
  );
  popupWithConfirmation.setEventListeners();
  popupWithConfirmation.open();
}

api
  .getInitialCards("cards")
  .then((data) => {
    section.cardList = new Section(
      {
        items: data,
        renderer: (image) => {
          const isCardOwner = image.owner._id === userInfo._id;
          const card = new Card(
            image.link,
            image.name,
            popupWithImage,
            image.likes.length,
            isCardOwner,
            image._id,
            handleDeleteCard,
            image.likes,
            userInfo,
            api
          );
          const cardElement = card.generateCard();
          section.cardList.setItem(cardElement);
        },
      },
      cardElement
    );
    section.cardList.renderItems();
  })
  .catch((error) => {
    console.error("Error getting the cards info:", error);
  });

const formEditProfile = new FormValidator("#form-edit-profile", listOfClasses);
formEditProfile.enableValidation();

const formAddPost = new FormValidator("#form-add-post", listOfClasses);
formAddPost.enableValidation();

const handleFormSubmit = (formAddPost) => {
  formAddPost;
};

const popupWithFormPost = new PopupWithForm(
  ".post-container",
  handleFormSubmit
);
popupWithFormPost.setEventListeners();

addPost.addEventListener("click", () => {
  popupWithFormPost.open();
});

const popupWithFormEdit = new PopupWithForm(
  ".edit-container",
  handleFormSubmit
);
popupWithFormEdit.setEventListeners();

openPopup.addEventListener("click", () => {
  popupWithFormEdit.open();
});

const handleUpdateProfileImage = (formUpdateImageProfile) => {
  formUpdateImageProfile;
};

const popupEditProfileIamge = new PopupEditProfileImage(
  ".edit-img-profile-container",
  handleUpdateProfileImage
);
popupEditProfileIamge.setEventListeners();

userProfileImage.addEventListener("click", () => {
  popupEditProfileIamge.open();
});

const formChangeImageProfile = new FormValidator(
  "#form-edit-profile-image",
  listOfClasses
);
formChangeImageProfile.enableValidation();

saveUserImageProfileButton.addEventListener("click", () => {
  const saveButton = document.querySelector("#save-profile-image-button");

  saveButton.textContent = "Salvando...";

  api
    .updateUserProfileImage(
      "users/me/avatar",
      document.querySelector("#profile-image-input").value
    )
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        image: data.avatar,
        id: data._id
      });
    })
    .catch((error) => {
      console.error("Error getting the user info:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      saveButton.setAttribute("disabled", true);
      saveButton.classList.add("button_inactive");
      popupEditProfileIamge.close();
    });
});

popupSaveButton.addEventListener("click", handleSaveButton);

function handleSaveButton(evt) {
  evt.preventDefault();

  const name = document.getElementById("name");
  const about = document.getElementById("about");
  const saveButton = document.getElementById("save-button");

  saveButton.textContent = "Salvando...";

  api
    .updateUserInfo("users/me", name.value, about.value)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        image: data.avatar,
        id: data._id
      });
    })
    .catch((error) => {
      console.error("Error getting the user info:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      saveButton.setAttribute("disabled", true);
      saveButton.classList.add("button_inactive");
      popupWithFormEdit.close();
    });
}

savePostButton.addEventListener("click", () => {
  const url = document.querySelector("#post-image-url").value;
  const title = document.querySelector("#post-title").value;
  const saveButton = document.querySelector("#save-button-post");

  saveButton.textContent = "Salvando...";

  api
    .addNewPost("cards", title, url)
    .then((data) => {
      const newCard = new Card(
        data.link,
        data.name,
        popupWithImage,
        data.likes.length,
        true,
        data._id,
        handleDeleteCard,
        data.likes,
        userInfo,
        api
      );
      const newCardElement = newCard.generateCard();
      section.cardList.addNewItem(newCardElement);
    })
    .catch((error) => {
      console.error("Error adding new post:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      saveButton.setAttribute("disabled", true);
      saveButton.classList.add("button_inactive");
      popupWithFormPost.close();
    });
});