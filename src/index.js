import Card from "./scripts/card.js";
import FormValidator from "./scripts/formValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import { cardElement, addPost, openPopup, listOfClasses, images, popupSaveButton, savePostButton } from './scripts/utils.js';

import './pages/index.css'

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

  popupWithFormEdit.close();
}

popupSaveButton.addEventListener('click', handleSaveButton);

savePostButton.addEventListener('click', () => {
  const url = document.querySelector("#post-image-url").value;
  const title = document.querySelector("#post-title").value;
  const newCard = new Card(url, title, popupWithImage);
  const newCardElement = newCard.generateCard();
  console.log(newCardElement);
  cardList.addNewItem(newCardElement);
  popupWithFormPost.close();
})
