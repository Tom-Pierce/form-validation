function checkFormValidity() {
  const emailInput = document.getElementById("mail");
  const countryInput = document.getElementById("country");
  const zipcodeInput = document.getElementById("zipcode");
  const passwordInput = document.getElementById("pwd");
  const confirmPasswordInput = document.getElementById("confirm-pwd");

  if (!validateEmail(emailInput.value)) {
    emailInput.setCustomValidity(
      "Please enter a valid email. For example, example@mail.com"
    );
    emailInput.reportValidity();
    return;
  } else {
    emailInput.setCustomValidity("");
    emailInput.reportValidity();
  }

  if (validateZipcode(zipcodeInput.value, countryInput.value)) {
    zipcodeInput.setCustomValidity("");
    zipcodeInput.reportValidity();
  } else {
    zipcodeInput.setCustomValidity(
      `Please enter a valid zipcode for ${countryInput.value}.`
    );
    zipcodeInput.reportValidity();
    return;
  }

  if (!validatePassword(passwordInput.value).valid) {
    passwordInput.setCustomValidity(validatePassword(passwordInput.value).reason);
    passwordInput.reportValidity();
    return;
  } else{
    passwordInput.setCustomValidity("");
    passwordInput.reportValidity();
  }

  if(!validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)){
    confirmPasswordInput.setCustomValidity("Passwords must match");
    confirmPasswordInput.reportValidity();
    return;
  } else {
    confirmPasswordInput.setCustomValidity("");
    confirmPasswordInput.reportValidity();
  }
}

function validateEmail(email) {
  if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validateZipcode(zipcode, country) {
  const irelandZipCodeRegex =
    /^([AC-FHKNPRTV-Y]{1}[0-9]{2}|D6W)[ ]?[0-9AC-FHKNPRTV-Y]{4}$/;
  const britainZipCodeRegex = /^([a-zA-Z]{1,2}\d{1,2})\s*?(\d[a-zA-Z]{2})$/;
  const franceZipCodeRegex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  switch (country) {
    case "ireland":
      if (irelandZipCodeRegex.test(zipcode)) {
        return true;
      } else {
        return false;
      }
    case "england":
      if (britainZipCodeRegex.test(zipcode)) {
        return true;
      } else {
        return false;
      }
    case "france":
      if (franceZipCodeRegex.test(zipcode)) {
        return true;
      } else {
        return false;
      }
  }
}

function validatePassword(password) {
  const minLength = 8;
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsNumber = /[0-9]/.test(password);
  const containsSpecialChar = /[!@#$%^&*]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      reason: "Password must be at least 8 characters long.",
    };
  }

  if (!containsUppercase || !containsLowercase) {
    return {
      valid: false,
      reason: "Password must contain both uppercase and lowercase letters.",
    };
  }

  if (!containsNumber) {
    return {
      valid: false,
      reason: "Password must contain at least one number.",
    };
  }

  if (!containsSpecialChar) {
    return {
      valid: false,
      reason:
        "Password must contain at least one special character (!@#$%^&*).",
    };
  }

  return { valid: true };
}

function validateConfirmPassword(password, confirmPassword){
    if(password === confirmPassword){
        return true;
    }
    return false;
}

const form = document.getElementById("form");
const inputs = form.querySelectorAll("input, select");

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    checkFormValidity();
    event.preventDefault();
  });
});

document.getElementById("submit-form").addEventListener("click", (event) => {
  checkFormValidity();
  event.preventDefault();
});
