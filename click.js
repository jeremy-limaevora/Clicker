const button = document.querySelector("button");
const clickCountElement = document.getElementById("clickCount");
let coins = 0;
let clickCounter = 0;

// Fonction pour récupérer le compteur de clics et de coins depuis le localStorage ou initialiser à 0 si absent
function getClickCount() {
    const savedClickCount = localStorage.getItem('clickCount');
    return savedClickCount ? parseInt(savedClickCount, 10) : 0;
}

function getCoins() {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins, 10) : 0;
}

// Fonction pour sauvegarder le compteur de clics et de coins dans le localStorage
function saveClickCount(clickCount) {
    localStorage.setItem('clickCount', clickCount);
}

function saveCoins(coins) {
    localStorage.setItem('coins', coins);
}

// Initialisez le compteur à partir du localStorage ou à 0 si absent
let clickCount = getClickCount();

button.addEventListener("click", () => {
    clickCount++; // Incrémentez le compteur à chaque clic
    clickCountElement.textContent = `Tu as ${clickCount} clic`; // Affichez le nombre de clics

    clickCounter++;
    if (clickCounter === 20) {
        clickCounter = 0; // Réinitialiser le compteur après chaque série de 20 clics
        // Ajouter 10 coins chaque nouvelle série de 20 clics
        coins += 10;
        saveCoins(coins);
        // Mettre à jour l'affichage des coins
        updateCoinsDisplay();
    }

    // Sauvegardez le compteur dans le localStorage
    saveClickCount(clickCount);
});

// Assurez-vous de mettre à jour l'affichage au chargement de la page
clickCountElement.textContent = `Tu as ${clickCount} clic`;

// Fonction pour mettre à jour l'affichage des coins
function updateCoinsDisplay() {
    const coinsDisplay = document.getElementById("coinsDisplay");
    coinsDisplay.textContent = `Coins: ${coins}`;
}

// Fonction pour réinitialiser les compteurs de clics et de séries de clics
function resetCounters() {
    clickCount = 0;
    clickCounter = 0;
    saveClickCount(clickCount);
    clickCountElement.textContent = `Tu as ${clickCount} clic`;
}

// Mettre à jour l'affichage des coins au chargement de la page
updateCoinsDisplay();

const resetButton = document.getElementById("resetButton");

// Ajoutez un gestionnaire d'événements pour le bouton de réinitialisation
resetButton.addEventListener("click", () => {
    // Réinitialiser uniquement les compteurs de clics et de séries de clics
    resetCounters();
});

function updateClickCount() {
    clickCount++;
    document.getElementById('clickCount').textContent = `Nombre de clics: ${clickCount}`;

    // Changer le fond à chaque clic
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url(${backgroundImages[randomIndex]})`;
    document.body.style.backgroundSize = 'cover'; // Ajustez la taille du fond si nécessaire
}

const backgroundImages = [
    'img/elysée.jpg',
    'img/vieux port.jpg',
    'img/tour-eiffel.jpg',
    
    // Ajoutez d'autres chemins d'image ici
];

const changeBackgroundButton = document.getElementById("changeBackgroundButton");

// Ajouter un gestionnaire d'événements pour le bouton de changement de fond
changeBackgroundButton.addEventListener("click", updateClickCount);