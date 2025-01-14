const categorySelector = document.querySelector('.form-select');

categorySelector.addEventListener('change', () => {
    const mainContent = document.querySelector('main');
    mainContent.classList.add('hidden'); // Cache le contenu actuel

    setTimeout(() => {
        // Charger les nouvelles données
        const selectedCategory = categorySelector.value;
        updateCategory(selectedCategory);

        mainContent.classList.remove('hidden'); // Affiche le nouveau contenu
    }, 1000); // Temps de transition pour le fade-out
});
function updateCategory(category) {
    // Charger la configuration correspondante
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            if (!config[category]) {
                console.error(`Configuration introuvable pour la catégorie : ${category}`);
                return;
            }

            const data = config[category];

            const favicon = document.querySelector('link[rel="icon"]');
            if (favicon) {
                favicon.href = data.favicon;  // Change le favicon selon la catégorie
            }

            // Met à jour le contenu dynamique
            document.title = data.texts.brandName;
            document.querySelector('.brand').innerText = data.texts.brandName;
            document.querySelector('.brandName').innerText = data.texts.brandName;
            document.querySelector('.first-section').style.backgroundImage = `url(${data.headerImage})`;
            document.body.style.backgroundImage = `url(${data.body})`;

            // Met à jour les couleurs
            document.documentElement.style.setProperty('--primary-color', data.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', data.secondaryColor);

            // Met à jour les images

            document.querySelector('.person').style.backgroundImage = `url(${data.person[0]})`;
            document.querySelector('.image-container-1').style.backgroundImage = `url(${data.images[0]})`;
            document.querySelector('.image-container-2').style.backgroundImage = `url(${data.images[1]})`;
            document.querySelector('.image-container-3').style.backgroundImage = `url(${data.images[2]})`;

            // Met à jour les textes
            document.querySelector('.slogan').innerText = data.texts.slogan;
            document.querySelector('.intro').innerText = data.texts.intro;
            document.querySelector('.address').innerText = data.texts.address;
            document.querySelector('.description').innerText = data.texts.description;
            document.querySelector('.clock').innerText = data.texts.clock;

        })
        .catch(error => console.error('Erreur lors du chargement de la configuration :', error));
}

// Initialiser la catégorie par défaut à l'ouverture
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'boulanger'; // Par défaut "boulanger"
    updateCategory(category);
});
