const button = document.querySelector("button");
const clickCountElement = document.getElementById("clickCount");
let coins = getCoins();
let clickCounter = 0;
let autoClicks = 0;

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
    console.log(`Pièces sauvegardées: ${coins}`); // Pour vérifier
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
    console.log(`Pièces récupérées: ${coins}`); // Pour vérifier
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

    // Réinitialiser le nombre de clics automatiques à 0
    autoClicks = 0;
    // Mettre à jour l'affichage des clics automatiques si nécessaire
});

function buyAutoClick() {
    const cost = 10; // Coût en pièces pour acheter un clic automatique "Impôt"
    if (coins >= cost) {
        coins -= cost; // Déduire le coût de l'achat du total de pièces
        autoClicks++; // Augmenter le nombre de clics automatiques "Impôt"
        saveCoins(coins); // Mettre à jour le total de pièces dans le localStorage
        updateCoinsDisplay(); // Mettre à jour l'affichage du total de pièces
    } else {
        alert("Pas assez de pièces pour acheter un clic automatique.");
    }
}

setInterval(function() {
    for (let i = 0; i < autoClicks; i++) {
        autoClick();
    }
}, 2000); // Exécute les clics automatiques toutes les 2 secondes

function autoClick() {
    clickCount += 2; // Ajoute 2 clics à chaque fois
    coins += 1; // Ajoute 1 pièce à chaque fois
    saveClickCount(clickCount);
    saveCoins(coins); // Sauvegarde le nombre de pièces
    updateClickCountDisplay(); // Mettre à jour l'affichage du nombre de clics
    updateCoinsDisplay();
}

function updateClickCountDisplay() {
    clickCountElement.textContent = `Tu as ${clickCount} clic`;
}

// Fonction pour jouer le son lorsque le bouton "citoyen" est cliqué
function playCoinSound() {
    const coinSound = document.getElementById("coinSound");
    coinSound.currentTime = 0; // Rembobine le son au début
    coinSound.play(); // Joue le son
}

// Modifiez la fonction autoCoins pour ajouter des pièces toutes les 2 secondes
function autoCoins() {
    coins += 2; // Ajoute 2 pièces à chaque fois
    saveCoins(coins); // Sauvegarde le nombre de pièces
    updateCoinsDisplay(); // Met à jour l'affichage des pièces
}

// Ajoutez un gestionnaire d'événements pour le bouton "citoyen"
const citoyenButton = document.getElementById("citoyenButton");
citoyenButton.addEventListener("click", () => {
    playCoinSound(); // Joue le son
    buyCitizen(); // Achat d'un citoyen
});

// Fonction pour acheter un citoyen
function buyCitizen() {
    const cost = 100; // Coût en pièces pour acheter un citoyen
    if (coins >= cost) {
        coins -= cost; // Déduire le coût de l'achat du total de pièces
        autoClicks++; // Augmenter le nombre de clics automatiques (citoyens)
        saveCoins(coins); // Mettre à jour le total de pièces dans le localStorage
        updateCoinsDisplay(); // Mettre à jour l'affichage du total de pièces
    } else {
        alert("Pas assez de pièces pour acheter un citoyen.");
    }
}

const ursafButton = document.getElementById("ursafButton");
ursafButton.addEventListener("click", buyUrsaf);


function buyUrsaf() {
    const cost = 150; // Coût en pièces pour acheter un Ursaf
    const autoClicksPerUrsaf = 150; // Nombre de clics automatiques par Ursaf

    if (coins >= cost) {
        coins -= cost; // Déduire le coût de l'achat du total de pièces
        autoClicks += autoClicksPerUrsaf; // Augmenter le nombre de clics automatiques
        saveCoins(coins); // Mettre à jour le total de pièces dans le localStorage
        updateCoinsDisplay(); // Mettre à jour l'affichage du total de pièces
        updateAutoClicksDisplay(); // Mettre à jour l'affichage du nombre de clics automatiques
    } else {
        alert("Pas assez de pièces pour acheter un Ursaf.");
    }
}

// Fonction pour mettre à jour l'affichage du nombre de clics automatiques
function updateAutoClicksDisplay() {
    const autoClicksDisplay = document.getElementById("autoClicksDisplay");
    autoClicksDisplay.textContent = `Clics automatiques: ${autoClicks}`;
}
updateAutoClicksDisplay();

function buyHussier() {
    const cost = 100; // Coût en pièces pour acheter un Hussier
    const autoClicksPerHussier = 10; // Nombre de clics automatiques par Hussier

    if (coins >= cost) {
        coins -= cost; // Déduire le coût de l'achat du total de pièces
        autoClicks += autoClicksPerHussier; // Augmenter le nombre de clics automatiques
        saveCoins(coins); // Mettre à jour le total de pièces dans le localStorage
        updateCoinsDisplay(); // Mettre à jour l'affichage du total de pièces
        updateAutoClicksDisplay(); // Mettre à jour l'affichage du nombre de clics automatiques
    } else {
        alert("Pas assez de pièces pour acheter un Hussier.");
    }
}

const hussierButton = document.getElementById("hussierButton");
hussierButton.addEventListener("click", buyHussier);
updateAutoClicksDisplay();







document.getElementById('jeremistreButton').addEventListener('click', function() {
    var imageElement = document.querySelector("button img"); // Sélectionne l'élément <img> à l'intérieur du bouton
    if (imageElement.src.endsWith('../img/macron.png')) {
        imageElement.src = '../img/jeremistre.png'; 
    } else {
        imageElement.src = '../img/macron.png'; // Changez 'macron.png' par le chemin de votre première image
    }
});

 // Changer le fond à chaque clic
 const backgroundImages = [
    '../img/elysée.jpg',
    '../img/maison-bl.jpg'
];

// Sélectionne une image de fond au hasard
function getRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
}

// Gestionnaire d'événements pour le bouton "Changer de fond"
document.getElementById('changeBackgroundButton').addEventListener('click', function() {
    const newBackgroundImage = getRandomBackgroundImage();
    document.body.style.backgroundImage = `url(${newBackgroundImage})`;
    document.body.style.backgroundSize = 'cover'; // Ajustez la taille du fond si nécessaire
});
