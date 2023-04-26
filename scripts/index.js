const closePopup = document.getElementById('close-button');
const openPopup = document.querySelector('#edit-profile');
const popupSection = document.querySelector('#popup');

function handleOpenPopup() {
    popupSection.classList.add('popup-opened');
}

function handleClosePopup() {
    popupSection.classList.remove('popup-opened');
}

openPopup.addEventListener('click', handleOpenPopup);
closePopup.addEventListener('click', handleClosePopup);
