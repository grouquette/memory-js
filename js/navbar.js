// Vérifier si un utilisateur est connecté
function isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser !== null;
}

// Afficher ou cacher le bouton de déconnexion en fonction de l'état de connexion
function updateNavbar() {
    const logoutButton = document.getElementById('logoutButton');
    if (isLoggedIn()) {
        logoutButton.style.display = 'inline-block'; // Affiche le bouton si connecté
    } else {
        logoutButton.style.display = 'none'; // Cache le bouton si non connecté
    }
}

// Déconnecter l'utilisateur
function logout() {
    localStorage.removeItem('currentUser'); // Supprime la session utilisateur
    window.location.href = 'index.html'; // Redirige vers la page de connexion
}

// Ajouter un gestionnaire d'événements au bouton de déconnexion
document.getElementById('logoutButton').addEventListener('click', logout);

// Mettre à jour la barre de navigation au chargement
updateNavbar();