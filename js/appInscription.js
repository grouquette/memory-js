import {
  nameValidator,
  nameChecker,
  emailChecker,
  emailValidator,
  passwordValidator,
  confirmValidator,
} from "./events/validator.js";

import {setData } from "./events/storage.js";

window.onload = init;

function init() {

  const $signupForm = document.getElementById("signup-form");
  const $errorMessage = document.getElementById("errorMessage");

  const errors = [];
  
  let password = document.getElementById("password1");
  let power = document.getElementById("power-point");
  let powerText = document.getElementById("power-text");
  password.oninput = function () {
    let point = 0;
    let value = password.value;
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
    let strength = ["Trop faible", "Faible", "Moyen", "Fort", "Très fort"];

    if (value.length >= 6) {
      let arrayTest = [/\d/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(value)) {
          point += 1;
        }
      });
    }
    power.style.width = widthPower[point];
    power.style.backgroundColor = colorPower[point];
    powerText.innerHTML = strength[point];
  };
  
  $signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const $inputs = this.querySelectorAll("input");

    const user = {};

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
          } else if (noDoubleName) {
            errors.push("Nom d'utilisateur déja utilisé");
          } else {
            user.username = input.value;
          }
          break;

        case "mail":
          if (!testMail) {
            errors.push("Veuillez entrer une adresse mail valide");
          } else if (noDoubleMail) {
            errors.push("Cette adresse mail est déja utilisée");
          } else {
            user.mail = input.value;
          }
          break;
        case "password1":
          if (!testPassword) {
            errors.push("Veuillez entrer un mot de passe valide");
          }
          break;
        case "password2":
          if (!testPassword) {
            errors.push("Veuillez entrer un mot de passe valide");
          } else if (!confirmPassword) {
            errors.push("Veuillez entrer le même mot de passe");
          } else {
            user.password = input.value;
          }
          break;

        default:
          errors.push("Tricheur !");

          break;
      }
    }

    if (errors.length > 0) {
      $errorMessage.innerHTML = errors.join("<br>");
      const verifImg = document.createElement("img");
      verifImg.src = "assets/error.svg";
      verifImg.style.width = "25px";
      $errorMessage.appendChild(verifImg);
      $errorMessage.classList.remove("hidden");

      setTimeout(() => {
        $errorMessage.classList.add("hidden");
        errors.splice(0, errors.length);
      }, 4000);
    } else {
      const verifImg = document.createElement("img");
      verifImg.src = "assets/check.svg";
      verifImg.style.width = "25px";
      $errorMessage.appendChild(verifImg);
      setData("users", user);
      alert("Inscription reussie !");
      errors.splice(0, errors.length);
    }

    this.reset();

    this.querySelector("#username").focus();
  });
}
