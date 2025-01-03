/**
 * Check Username Validity
 * @param {string} nodeID
 * @returns {boolean}
 */
const nameValidator = (nodeID) => {
  const nameRegexp = /^[a-zA-Z0-9]{3,}$/;
  const nameValid = nameRegexp.test(document.getElementById(nodeID).value);
  return nameValid;
};
/**
 * Check if username don't already exist
 * @param {*}
 * @returns {boolean}
 */
const nameChecker = () => {
  const usernameInput = document.getElementById("username").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const nameCheck = users.some(function (user) {
    return user.username === usernameInput;
  });
  return nameCheck;
};
/**
 * Check if email don't already exist
 * @param {}
 * @returns {boolean}
 */
const emailChecker = () => {
  const mailInput = document.getElementById("mail").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const mailCheck = users.some(function (user) {
    return user.mail === mailInput;
  });
  return mailCheck;
};

/**
 *Check Email Validity
 * @param {string} nodeID
 * @returns {boolean}
 */
const emailValidator = (nodeID) => {
  const emailRegexp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/);

  const mailValid = emailRegexp.test(document.getElementById(nodeID).value);
  return mailValid;
};

/**
 * Check Password Validity
 * @param {string} nodeID
 * @returns {boolean}
 */
const passwordValidator = (nodeID) => {
  const passwordRegexp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^-_&*])(?=.{6,})/
  );

  const passwordValid = passwordRegexp.test(
    document.getElementById(nodeID).value
  );
  return passwordValid;
};
/**
 * Check Confirm Password
 * @param {string} nodeID
 * @param {string} password1
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
};
export {
  nameValidator,
  nameChecker,
  emailChecker,
  emailValidator,
  passwordValidator,
  confirmValidator,
};
