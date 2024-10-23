import {
  nameValidator,
  nameChecker,
  emailChecker,
  emailValidator,
  passwordValidator,
  confirmValidator,
} from "./validator.js";

window.onload = init;

function init() {
  // Target
  const $signupForm = document.getElementById("signup-form");
  const $errorMessage = document.getElementById("errorMessage");

  // Manage errors
  const errors = [];
  // Listen
  $signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Return all HTMLElement with input
    const $inputs = this.querySelectorAll("input");

    //  Création d'un Objet User en devenir
    const user = {};
    
    
    // Loop to validate
    for (const input of $inputs) {
      const testMail = emailValidator("mail");
      const noDoubleMail = emailChecker("mail");
      const confirmPassword = confirmValidator("password2", "password1");
      const testName = nameValidator("username");
      const noDoubleName = nameChecker("username");
      const testPassword = passwordValidator("password1");
        
      switch (input.id) {
        case "username":
          if (!testName) {
            errors.push("Nom d'utilisateur non valide !");
          } else if (!noDoubleName) {
            errors.push("Nom d'utilisateur déja utilisé");
          }else {
            user.username = input.value;
          }
          break;

        case "mail":
          if (!testMail) {
            errors.push("Veuillez entrer une adresse mail valide");
            } else if (!noDoubleMail) {
            errors.push("Cette adresse mail est déja utilisée");
          } else {
            user.mail = input.value;
          }
          break;
        case "password1":
          if (!testPassword) {
            errors.push("Veuillez entrer un mot de passe valide");
          } else {
            user.password = input.value;
          }
          break;
        case "password2":
          if (!confirmPassword) {
            errors.push("Veuillez entrer le même mot de passe");
          } else {
            user.date = input.value;
          }
          break;

        default:
          errors.push("Escroc !");

          break;
      }
    }
    // Manage empty errors
    if (errors.length > 0) {
      $errorMessage.innerHTML = errors.join("<br>");
      const verifImg = document.createElement("img");
      verifImg.src = "assets/error.svg";
      verifImg.style.width = "25px";
      $errorMessage.appendChild(verifImg);
      $errorMessage.classList.remove("hidden");

      // Timer errors msg
      setTimeout(() => {
        $errorMessage.classList.add("hidden");
        $errorMessage.innerHTML = "";
      }, 4000);
    } else {
      const verifImg = document.createElement("img");
      verifImg.src = "assets/check.svg";
      verifImg.style.width = "25px";
      $errorMessage.appendChild(verifImg);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Inscription reussie !");
    }

    // Clear inputs
    this.reset();
  });
}
