// Script to handle dynamic content loading
const localStorageKey = 'selectedRoom';

// Load data from external JSON file
function loadData(roomId) {
    fetch('/js/data-prueba3.json')
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
        <h3>Detalles</h3>
        <ul>
            <li>Camas Singles: ${roomData.cantidad_camas_simples}</li>
            <li>Camas Dobles: ${roomData.cantidad_camas_dobles}</li>
            <li>Cunas: ${roomData.cantidad_cunas}</li>
            <li>Almohada: ${roomData.almohada}</li>
            <li>Manta: ${roomData.manta}</li>
            <li>Baño Compartido: ${roomData.bano_compartido}</li>
            <li>Toilette Compartido: ${roomData.toilette}</li>
            <li>Ropa de Cama: ${roomData.ropa_de_cama}</li>
            <li>Toalla / Toallón: ${roomData.toalla_toallon}</li>
            <li>Tarifa por huesped por noche: ${roomData.tarifa}</li>
            <li>Check-in desde: ${roomData.hora_inicio_check_in}</li>
            <li>Check-in hasta: ${roomData.hora_fin_check_in}</li>
            <li>Check-out desde: ${roomData.hora_inicio_check_out}</li>
            <li>Check-out hasta: ${roomData.hora_fin_check_out}</li>
            <li>Piso: ${roomData.planta}</li>
            <li>Calefacción: ${roomData.calefaccion}</li>
            <li>Agua Caliente: ${roomData.agua_caliente}</li>
            <li>Escritorio: ${roomData.escritorio}</li>
            <li>Hablamos en Español: ${roomData.espanol}</li>
            <li>We speak English: ${roomData.ingles}</li>
            <li>Parliamo in Italiano: ${roomData.italiano}</li>
            <li>Wir sprechen auf Deutsch: ${roomData.aleman}</li>
            <li>Nous parlons en français: ${roomData.frances}</li>
            <li>Foto: ${roomData.image}</li>
        </ul>
    `;

    // Update image column
    const imageColumn = document.querySelector('.image');
    imageColumn.innerHTML = `
        <h3>Image</h3>
        <img src="${roomData.image}" alt="Foto de la Habitación" style="max-width: 100%; border-radius: 5px;">
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