import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupEditProfileImage from "./components/PopupEditProfileIamge.js";
import PopupConfirmDeleteCard from "./components/PopupConfirmDeleteCard.js";
import UserInfo from "./components/UserInfo.js";
import {
  cardElement,
  addPost,
  openPopup,
  listOfClasses,
  popupSaveButton,
  savePostButton,
  cardCountLikes,
  cardLike,
  userProfileImage,
  saveUserImageProfileButton,
  popupDeletePostIcon,
  closeButtonPopupDeletePost,
} from "./utils/utils.js";

import Api from "./components/Api.js";

import "./pages/index.css";

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_05/",
  headers: {
    authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage(".image__container");

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-about",
  imageSelector: "#profile-image",
});

export let user;
api
  .getUserInfo("users/me")
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
      image: data.avatar,
    });
    user = data;
    console.log(user);
  })
  .catch((error) => {
    console.error("Error getting the user info:", error);
  });

closeButtonPopupDeletePost.addEventListener("click", () => {
  popupDeletePost.classList.remove("popup-opened");
});

function handleDeleteCard(cardId) {
  const popupConfirmDeleteCard = new PopupConfirmDeleteCard(
    "#delete-card-container",
    api.deleteCard("cards", cardId)
  );
  popupConfirmDeleteCard.setEventListeners();
  popupConfirmDeleteCard.open();
}

let cardList;
api
  .getInitialCards("cards")
  .then((data) => {
    console.log(data);
    cardList = new Section(
      {
        items: data,
        renderer: (image) => {
          const isCardOwner = image.owner._id === user._id;
          const card = new Card(
            image.link,
            image.name,
            popupWithImage,
            image.likes.length,
            isCardOwner,
            image._id,
            handleDeleteCard
          );
          const cardElement = card.generateCard();
          cardList.setItem(cardElement);
        },
      },
      cardElement
    );
    cardList.renderItems();
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
  console.log(addPost);
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
    .then((res) => res.json())
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        image: data.avatar,
      });
    })
    .catch((error) => {
      console.error("Error getting the user info:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
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
    .then((res) => res.json())
    .then((data) => {
      console.log("Update ", data);
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        image: data.avatar,
      });
    })
    .catch((error) => {
      console.error("Error getting the user info:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
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
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const newCard = new Card(
        data.link,
        data.name,
        popupWithImage,
        data.likes.length,
        true,
        data._id,
        handleDeleteCard
      );
      const newCardElement = newCard.generateCard();
      cardList.addNewItem(newCardElement);
    })
    .catch((error) => {
      console.error("Error adding new post:", error);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      popupWithFormPost.close();
    });
});
