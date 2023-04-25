const closePopup = document.getElementById('close-button');
const openPopup = document.querySelector('#edit-profile');


function handleOpenPopup() {
    let popupSection = document.querySelector('#popup');
    popupSection.classList.add('popup-opened')
}

openPopup.addEventListener('click', handleOpenPopup)