const closePopup = document.getElementById("close-button");
const openPopup = document.querySelector("#edit-profile");

const popupSection = document.querySelector("#popup");
const popupSaveButton = document.getElementById("save-button");
const profileName = document.getElementById("profile-name");
const profileAbout = document.getElementById("profile-about");

const elementWithAllImages = document.querySelector(".post");

const addPost = document.querySelector("#add-post");
const popupAddPost = document.querySelector("#popup-add-post");
const closePopupPost = document.querySelector("#close-button-post");
const savePostButton = document.querySelector("#save-button-post");

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

function handleOpenPopup(evt) {
  if (evt.target.id === "add-post") {
    popupAddPost.classList.add("popup-opened");
  } else if(evt.target.id === "edit-profile"){
    popupSection.classList.add("popup-opened");
  } else {
    const postImage = document.querySelector(".image");
    postImage.classList.add("popup-opened");
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

function renderPostCard(post) {
  const postTemplate = document.querySelector("#template").content;
  const postElement = postTemplate.querySelector(".post__card").cloneNode(true);

  postElement.querySelector(".post__card-image").setAttribute("src", post.url);
  postElement
    .querySelector(".post__card-image")
    .setAttribute("alt", `Imagem de ${post.title}`);
  postElement.querySelector(".post__card-content-title").textContent =
    post.title;

  postElement
    .querySelector(".post__card-content-like")
    .addEventListener("click", (evt) => {
      evt.target.setAttribute("src", "./images/post/post-like-filled.png");
    });

  postElement
    .querySelector(".post__card-remove")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });

    /* FUNCTION TO OPEN THE POPUP IMAGE */
    postElement.querySelector(".post__card-image").addEventListener("click", (evt) => {
      const postImageTitleContent = evt.target.nextElementSibling.nextElementSibling;
      const postImage = document.querySelector(".image__container-photo");
      const postImageTitle = document.querySelector(".image__container-name");

      postImage.setAttribute("src", evt.target.src);
      postImage.setAttribute("alt", `Foto do ${evt.target.src}`);
      postImageTitle.textContent = postImageTitleContent.textContent;
      
      handleOpenPopup(evt);
    })

  return postElement;
}

for (const image of images) {
  const postCreated = renderPostCard(image);
  elementWithAllImages.append(postCreated);
}

function handlePost(evt) {
  evt.preventDefault();

  const postTitle = document.querySelector("#post-title");
  const postImageUrl = document.querySelector("#post-image-url");

  if (postTitle === "" || postImageUrl === "") {
    return alert("Por favor, preencha todos os campos");
  }

  elementWithAllImages.prepend(
    renderPostCard({
      title: postTitle.value,
      url: postImageUrl.value,
    })
  );

  handleClosePopup(evt);
}


const closePopupImage = document.querySelector(".image__container-close")
closePopupImage.addEventListener('click', (evt) => {
  evt.target.parentElement.parentElement.classList.remove("popup-opened");
})

openPopup.addEventListener("click", handleOpenPopup);
closePopup.addEventListener("click", handleClosePopup);

popupSaveButton.addEventListener("click", handleSaveButton);

addPost.addEventListener("click", handleOpenPopup);
closePopupPost.addEventListener("click", handleClosePopup);

savePostButton.addEventListener("click", handlePost);


