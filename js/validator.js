/**
 * Check Username Validity
 * @param {string} nodeID 
 * @returns {boolean}
 */
const nameValidator = (nodeID) => {
    const nameRegexp = /^[a-zA-Z0-9]{3,20}$/;
    const nameValid = nameRegexp.test(document.getElementById(nodeID).value);
    return nameValid;    

}
/**
 * Check if username don't already exist
 * @param {string} nodeID 
 * @returns {boolean}
 */
const nameChecker = (nodeID) => {
    if (JSON.parse(localStorage.getItem("users"))=== null || nodeID.valueOf !== JSON.parse(localStorage.getItem("users")).username) {
        const nameCheck = true;
        return nameCheck;
    } else {
        const nameCheck = false;
        return nameCheck;
    }
}
/**
 * Check if email don't already exist
 * @param {string} nodeID 
 * @returns {boolean}
 */
const emailChecker = (nodeID) => {
    if (JSON.parse(localStorage.getItem("users"))=== null || nodeID.valueOf !== JSON.parse(localStorage.getItem("users")).email) {
        const emailCheck = true;
        return emailCheck;
    } else {
        const emailCheck = false;
        return emailCheck;
    }
}

/**
 *Check Email Validity
 * @param {string} nodeID
 * @returns {boolean}
 */
const emailValidator = (nodeID) => {
  // Cette expression régulière est conçue pour vérifier que l'adresse e-mail saisie est
  // conforme au format standard, avec un nom d'utilisateur qui peut contenir des lettres, des chiffres et des caractères spéciaux, suivi du signe "@" et d'un nom de domaine qui peut contenir des lettres, des chiffres, des tirets et des points.
  const emailRegexp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/);

  const mailValid = emailRegexp.test(document.getElementById(nodeID).value);
  return mailValid;
};

/**
 * Check Password
 * @param {string} nodeID
 * @returns {boolean}
 */
const passwordValidator = (nodeID) => {
  const passwordRegexp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^-_&*])(?=.{6,})/);
    // 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère special et 6 caractères minimum 

  const passwordValid = passwordRegexp.test(
    document.getElementById(nodeID).value
  );
  return passwordValid;
};
/**
 * 
 * @param {string} nodeID 
 * @returns {boolean}
 */
const confirmValidator = (nodeID, password1) => {
    if (nodeID.valueOf !== password1.valueOf) {
        const confirmValid = false;
        return confirmValid;
    } else {
        const confirmValid = true;
        return confirmValid;        
    }

}
export { nameValidator, nameChecker, emailChecker, emailValidator, passwordValidator, confirmValidator };

