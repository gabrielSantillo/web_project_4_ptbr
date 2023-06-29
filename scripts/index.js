import Card from "./Card.js";
import FormValidator from "./formValidator.js";
import { cardElement } from "./utils.js";
import Section from "./Section.js";

import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import UserInfo from "./UserInfo.js";

import { addPost, openPopup, listOfClasses, images, handleClosePopup, popupSaveButton, savePostButton } from './utils.js';

const popupWithImage = new PopupWithImage('.image__container');

const cardList = new Section({
  items: images,
  renderer: (image) => {
    const card = new Card(image.url, image.title, popupWithImage);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardElement);

cardList.renderItems();

const formEditProfile = new FormValidator("#form-edit-profile", listOfClasses);
formEditProfile.enableValidation();

const formAddPost = new FormValidator("#form-add-post", listOfClasses);
formAddPost.enableValidation();


const handleFormSubmit = (formAddPost) => {
  console.log(formAddPost)
}

const popupWithFormPost = new PopupWithForm('.post__container', handleFormSubmit);
popupWithFormPost.setEventListeners();

addPost.addEventListener('click', () => {
  popupWithFormPost.open()
})


const popupWithFormEdit = new PopupWithForm('.edit__container', handleFormSubmit);
popupWithFormEdit.setEventListeners();

openPopup.addEventListener('click', () => {
  popupWithFormEdit.open();
})

const userInfo = new UserInfo({
  nameSelector: '#profile-name',
  jobSelector: '#profile-about'
});

function handleSaveButton(evt) {
  evt.preventDefault();

  const name = document.getElementById("name");
  const about = document.getElementById("about");

  userInfo.setUserInfo({
    name: name.value,
    job: about.value
  });

  handleClosePopup(evt);
}

popupSaveButton.addEventListener('click', handleSaveButton);

