// Script to handle dynamic content loading
const localStorageKey = 'selectedRoom';

// Load data from external JSON file
function loadData(roomId) {
    fetch('/js/data-prueba2.json')
        .then(response => response.json())
        .then(data => {
            const roomData = data.rooms.find(room => room.id === roomId);
            if (roomData) {
                updateUI(roomData, roomId);
                saveToLocalStorage(roomId);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update the UI with room data
function updateUI(roomData, roomId) {
    // Update data column
    const dataColumn = document.querySelector('.data');
    dataColumn.innerHTML = `
        <h3>Room Information</h3>
        <ul>
            <li>Size: ${roomData.size}</li>
            <li>Capacity: ${roomData.capacity}</li>
            <li>Price: ${roomData.price}</li>
            <li>Amenities: ${roomData.amenities.join(', ')}</li>
        </ul>
    `;

    // Update image column
    const imageColumn = document.querySelector('.image');
    imageColumn.innerHTML = `
        <h3>Image</h3>
        <img src="${roomData.image}" alt="Room Image" style="max-width: 100%; border-radius: 5px;">
    `;

    // Update button styles
    updateButtonStyles(roomId);
}

// Highlight the active button
function updateButtonStyles(activeRoomId) {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.id === `btn-${activeRoomId}`) {
            button.classList.add('active');
        }
    });
}

// Save selected room to localStorage
function saveToLocalStorage(roomId) {
    localStorage.setItem(localStorageKey, roomId);
}

// Load selected room from localStorage on page load
function loadFromLocalStorage() {
    const savedRoomId = localStorage.getItem(localStorageKey);
    if (savedRoomId) {
        loadData(parseInt(savedRoomId));
    }
}

// Initialize page
window.onload = loadFromLocalStorage;
