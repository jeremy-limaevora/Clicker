const button = document.querySelector("button");
const clickCountElement = document.getElementById("clickCount");
let coins = 0;
let clickCounter = 0;

// Fonction pour récupérer le compteur de clics et de pièces depuis le localStorage ou initialiser à 0 si absent
function getClickCount() {
    const savedClickCount = localStorage.getItem('clickCount');
    return savedClickCount ? parseInt(savedClickCount, 10) : 0;
}

function getCoins() {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins, 10) : 0;
}

// Fonction pour sauvegarder le compteur de clics et de pièces dans le localStorage
function saveClickCount(clickCount) {
    localStorage.setItem('clickCount', clickCount);
}

// Fonction pour sauvegarder le nombre de pièces dans le localStorage
function saveCoins(coins) {
    localStorage.setItem('coins', coins);
}

// Fonction pour afficher un message lorsqu'une série de 20 clics est atteinte
function displayCoinMessage(message) {
    const coinMessageElement = document.getElementById("coinMessage");
    coinMessageElement.textContent = message;
    setTimeout(() => {
        coinMessageElement.textContent = ""; // Effacer le message après quelques secondes
    }, 2000); // Le message disparaîtra après 2 secondes (2000 millisecondes)
}

// Initialisez le compteur à partir du localStorage ou à 0 si absent
let clickCount = getClickCount();

// Mettre à jour la fonction de clic pour afficher le message et gagner des pièces
button.addEventListener("click", () => {
    clickCount++; // Incrémentez le compteur à chaque clic
    clickCountElement.textContent = `Tu as ${clickCount} clic`; // Affichez le nombre de clics

    clickCounter++;

    // Si le joueur atteint une série de 20 clics
    if (clickCounter % 20 === 0) {
        // Ajouter 10 pièces chaque nouvelle série de 20 clics
        coins += 10;
        saveCoins(coins);
        // Mettre à jour l'affichage des pièces
        updateCoinsDisplay();
        // Afficher le message "+10" lorsque le joueur gagne 10 pièces
        displayCoinMessage("+10");
    } else if (clickCounter % 2 === 0) {
        // Ajouter 1 pièce chaque série de 2 clics
        coins += 1;
        saveCoins(coins);
        // Mettre à jour l'affichage des pièces
        updateCoinsDisplay();
        // Afficher le message "+1" lorsque le joueur gagne 1 pièce
        displayCoinMessage("+1");
    }

    // Sauvegardez le compteur dans le localStorage
    saveClickCount(clickCount);
});

// Assurez-vous de mettre à jour l'affichage au chargement de la page
clickCountElement.textContent = `Tu as ${clickCount} clic`;

// Fonction pour mettre à jour l'affichage des pièces en utilisant le nombre de pièces dans le localStorage
function updateCoinsDisplay() {
    const coinsDisplay = document.getElementById("coinsDisplay");
    coins = getCoins(); // Récupérer le nombre de pièces depuis le localStorage
    coinsDisplay.textContent = `Coins: ${coins}`;
}

// Assurez-vous de mettre à jour l'affichage des pièces au chargement de la page
updateCoinsDisplay();

const resetButton = document.getElementById("resetButton");

// Ajoutez un gestionnaire d'événements pour le bouton de réinitialisation
resetButton.addEventListener("click", () => {
    // Réinitialiser uniquement le compteur de clics
    clickCount = 0;
    saveClickCount(clickCount);
    clickCountElement.textContent = `Tu as ${clickCount} clic`;

    // Réinitialiser le nombre de pièces à 0 dans le localStorage et dans l'affichage
    coins = 0;
    saveCoins(coins);
    updateCoinsDisplay();
});
