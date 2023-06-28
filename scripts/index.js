import Card from "./Card.js";
import FormValidator from "./formValidator.js";
import { cardElement } from "./utils.js";
import Section from "./Section.js";

import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import { addPost, openPopup } from './utils.js';

const images = [
  {
    title: "Vale de Yosemite",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    title: "Lago Louise",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    title: "Montanhas Carecas",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    title: "Latemar",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    title: "Parque Nacional da Vanoise ",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const listOfClasses = {
  fieldsetList: ".form__set",
  formInput: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__container-form-texts-",
};

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



// for (const image of images) {
//   const card = new Card(image.url, image.title);
//   const cardItem = card.generateCard();
//   cardElement.append(cardItem);
// }
