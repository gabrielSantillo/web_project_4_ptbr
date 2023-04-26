const closePopup = document.getElementById('close-button');
const openPopup = document.querySelector('#edit-profile');
const popupSection = document.querySelector('#popup');
const popupSaveButton = document.getElementById('save-button');
const profileName = document.getElementById('profile-name');
const profileAbout = document.getElementById('profile-about');

function handleOpenPopup() {
    popupSection.classList.add('popup-opened');
}

function handleClosePopup() {
    popupSection.classList.remove('popup-opened');
}

function handleSaveButton(evt) {
    evt.preventDefault();
    
    let name = document.getElementById('name');
    let about = document.getElementById('about');

    profileName.textContent = name.value;
    profileAbout.textContent = about.value;
    
    handleClosePopup();
}



openPopup.addEventListener('click', handleOpenPopup);
closePopup.addEventListener('click', handleClosePopup);
popupSaveButton.addEventListener('click', handleSaveButton);