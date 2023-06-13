import Card from "./Card.js";


const closePopup = document.getElementById("close-button");
const openPopup = document.querySelector("#edit-profile");

const popupSection = document.querySelector("#popup");
const popupSaveButton = document.getElementById("save-button");
const profileName = document.getElementById("profile-name");
const profileAbout = document.getElementById("profile-about");

const cardElement = document.querySelector(".post");

const addPost = document.querySelector("#add-post");
const popupAddPost = document.querySelector("#popup-add-post");
const closePopupPost = document.querySelector("#close-button-post");
const savePostButton = document.querySelector("#save-button-post");

// function that will close the popup when clicked outside of them
const popupClose = document.querySelectorAll(".close-popup");

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

for (const image of images) {
  const card = new Card(image.url, image.title);
  const cardItem = card.generateCard();
  cardElement.append(cardItem);
}

document.onkeydown = (evt) => {
  if (evt.key === "Escape") {
    const popup = Array.from(document.querySelectorAll(".popup"));
    popup.forEach((element) => {
      element.classList.remove("popup-opened");
    });
  }
};

function handleOpenPopup(evt) {
  if (evt.target.id === "add-post") {
    popupAddPost.classList.add("popup-opened");
  } else if (evt.target.id === "edit-profile") {
    popupSection.classList.add("popup-opened");
  } 
}

function handleClosePopup(evt) {
  if (
    evt.target.id === "close-button-post" ||
    evt.target.id === "save-button-post"
  ) {
    popupAddPost.classList.remove("popup-opened");
  } else {
    popupSection.classList.remove("popup-opened");
  }
}

function handleSaveButton(evt) {
  evt.preventDefault();

  const name = document.getElementById("name");
  const about = document.getElementById("about");

  if (!name.value || !about.value) {
    return alert("Please, complete the entire form before saving.");
  }

  profileName.textContent = name.value;
  profileAbout.textContent = about.value;

  handleClosePopup(evt);
}

function handlePost(evt) {
  evt.preventDefault();

  const postTitle = document.querySelector("#post-title");
  const postImageUrl = document.querySelector("#post-image-url");

  if (postTitle === "" || postImageUrl === "") {
    return alert("Por favor, preencha todos os campos");
  }

  cardElement.prepend(
    renderPostCard({
      title: postTitle.value,
      url: postImageUrl.value,
    })
  );

  handleClosePopup(evt);
}

openPopup.addEventListener("click", handleOpenPopup);
closePopup.addEventListener("click", handleClosePopup);

popupSaveButton.addEventListener("click", handleSaveButton);

addPost.addEventListener("click", handleOpenPopup);
closePopupPost.addEventListener("click", handleClosePopup);

savePostButton.addEventListener("click", handlePost);

// Closing a popup when clicking outside of it
popupClose.forEach((container) => {
  container.addEventListener("click", (evt) => {
    evt.target.classList.remove("popup-opened");
  });
});
