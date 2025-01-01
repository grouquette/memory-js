const $loginForm = document.getElementById("login-form");

$loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Récupérer les valeurs saisies dans le formulaire
    let username = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    console.log(username);

    // Récupérer les utilisateurs stockés dans le localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);

    // Chercher un utilisateur avec le même pseudo et mot de passe
    let usersFind = users.find(
      (user) => user.username === username  && user.password === password
    );

    if (usersFind) {
      // Sauvegarder les informations du joueur connecté
      localStorage.setItem("currentUser", JSON.stringify(usersFind));
      alert("Connexion réussie !");
      window.location.href = "profil.html";
    } else {
      alert("Pseudo ou mot de passe incorrect");
    }
  });