// const popupSection = document.querySelector("#popup");

// function renderPostCard(post) {
//   const postTemplate = document.querySelector("#template").content;
//   const postElement = postTemplate.querySelector(".post__card").cloneNode(true);

//   postElement.querySelector(".post__card-image").setAttribute("src", post.url);
//   postElement
//     .querySelector(".post__card-image")
//     .setAttribute("alt", `Imagem de ${post.title}`);
//   postElement.querySelector(".post__card-content-title").textContent =
//     post.title;

//   postElement
//     .querySelector(".post__card-content-like")
//     .addEventListener("click", (evt) => {
//       evt.target.setAttribute("src", "./images/post/post-like-filled.png");
//     });

//   postElement
//     .querySelector(".post__card-remove")
//     .addEventListener("click", (evt) => {
//       evt.target.parentElement.remove();
//     });

//   /* FUNCTION TO OPEN THE POPUP IMAGE */
//   postElement
//     .querySelector(".post__card-image")
//     .addEventListener("click", (evt) => {
//       const postImageTitleContent =
//         evt.target.nextElementSibling.nextElementSibling;
//       const postImage = document.querySelector(".image__container-photo");
//       const postImageTitle = document.querySelector(".image__container-name");

//       postImage.setAttribute("src", evt.target.src);
//       postImage.setAttribute("alt", `Foto do ${evt.target.src}`);
//       postImageTitle.textContent = postImageTitleContent.textContent;

//       handleOpenPopup(evt);
//     });

//   return postElement;
// }

// for (const image of images) {
//   const postCreated = renderPostCard(image);
//   elementWithAllImages.append(postCreated);
// }

// const closePopupImage = document.querySelector(".image__container-close");
// closePopupImage.addEventListener("click", (evt) => {
//   evt.target.parentElement.parentElement.classList.remove("popup-opened");
// });
