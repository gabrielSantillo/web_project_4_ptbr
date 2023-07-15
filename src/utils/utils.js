export const openPopup = document.querySelector("#edit-profile");
const popupSection = document.querySelector("#popup");
export const popupSaveButton = document.getElementById("save-button");
export const profileName = document.getElementById("profile-name");
export const profileAbout = document.getElementById("profile-about");
export const cardElement = document.querySelector(".post");
export const addPost = document.querySelector("#add-post");
const popupAddPost = document.querySelector("#popup-add-post");
export const popupElement = document.querySelector(".image");
export const popupImage = document.querySelector(".image__container-photo");
export const popupCaption = document.querySelector(".image__container-name");
export const savePostButton = document.querySelector("#save-button-post");
export const cardLike = document.querySelector('.post__card-content-like');
export const cardCountLikes = document.querySelector(".post__card-content-like_count");
export const userProfileImage = document.querySelector('#edit-profile-image');
export const saveUserImageProfileButton = document.querySelector("#save-profile-image-button");
export const popupDeletePostIcon = document.querySelector("#delete-post");
export const closeButtonPopupDeletePost = document.querySelector("#close-popup-delete-button");
export const popupDeletePostButton = document.querySelector("#popup-delete-post-button");

export const baseApi = {
  url: "https://around.nomoreparties.co/v1/web_ptbr_05/",
  authorization: "1c87feaf-7ea2-4dd9-b0cc-b4816af3e289",
  contentType: "application/json"
}

export const listOfClasses = {
  fieldsetList: ".form__set",
  formInput: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__container-form-texts-",
};

export const images = [
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
    title: "Parque Nacional da Vanoise",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];