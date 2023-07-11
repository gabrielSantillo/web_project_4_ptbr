import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
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
  userProfileImage
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


let user;
api
  .getUserInfo("users/me")
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
    });
    user = data;
  })
  .catch((error) => {
    console.error("Error getting the user info:", error);
  });

function handleDeleteCard(cardId) {
  api
  .deleteCard("cards", cardId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error deleting the card:", error);
  });
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
          const card = new Card(image.link, image.name, popupWithImage, image.likes.length, isCardOwner, image._id, handleDeleteCard);
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
});


const popupWithFormEdit = new PopupWithForm(
  ".edit-container",
  handleFormSubmit
);
popupWithFormEdit.setEventListeners();

openPopup.addEventListener("click", () => {
  popupWithFormEdit.open();
});

popupSaveButton.addEventListener("click", handleSaveButton);

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-about",
});

function handleSaveButton(evt) {
  evt.preventDefault();

  const name = document.getElementById("name");
  const about = document.getElementById("about");

  api
    .updateUserInfo("users/me", name.value, about.value)
    .then((data) => {
      userInfo.setUserInfo({
        name: name.value,
        job: about.value,
      });
    })
    .catch((error) => {
      console.error("Error getting the user info:", error);
    });

  popupWithFormEdit.close();
}

savePostButton.addEventListener("click", () => {
  const url = document.querySelector("#post-image-url").value;
  const title = document.querySelector("#post-title").value;
  api
    .addNewPost("cards", title, url)
    .then((data) => {
      console.log(data);
      const newCard = new Card(url, title, popupWithImage);
      const newCardElement = newCard.generateCard();
      cardList.addNewItem(newCardElement);
      popupWithFormPost.close();
    })
    .catch((error) => {
      console.error("Error adding new post:", error);
    });
});

