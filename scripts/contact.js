"use strict";

var $contactForm = $(".contact-form");
var $inputs = $$("input, textarea");

function validateEmail(value) {
  var emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = emailPattern.test(value);

  if (!isValid) {
    return "Ingrese un email valido";
  }

  return null;
}

function validateName(value) {
  if (!value.length) {
    return "Campo vacio";
  }

  if (value.length < 3) {
    return "Debe contener al menos 3 caracteres";
  }

  return null;
}

function validateMessage(value) {
  if (value.length <= 5) {
    return "Debe contener al menos 6 caracteres";
  }

  return null;
}

var validate = {
  email: validateEmail,
  name: validateName,
  message: validateMessage,
};

function validateForm() {
  var isValid = true;

  $inputs.forEach(function ($input) {
    var inputError = validate[$input.name]($input.value);
    var $errorMsg = $input.nextElementSibling;

    if (inputError) {
      $input.classList.add("error");
      $errorMsg.textContent = inputError;
      isValid = false;
    }
  });

  return isValid;
}

function getFormValues(elements) {
  var formValues = {};

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.name) {
      formValues[element.name] = element.value;
    }
  }

  return formValues;
}

function handleInputBlur(e) {
  var $input = e.target;
  var inputError = validate[$input.name]($input.value);
  var $errorMsg = $input.nextElementSibling;

  if (inputError) {
    $input.classList.add("error");
    $errorMsg.textContent = inputError;
  }
}

function handleInputFocus(e) {
  var $input = e.target;
  var $errorMsg = $input.nextElementSibling;

  if ($input.classList.contains("error")) {
    $input.classList.remove("error");
    $errorMsg.textContent = "";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  var elements = e.target.elements;
  var isValid = validateForm();

  if (!isValid) return;

  var formValues = getFormValues(elements);

  var mailtoLink =
    "mailto:" +
    encodeURIComponent("boogle@game.com") +
    "?subject=" +
    encodeURIComponent("Consulta boogle - " + formValues.name) +
    "&body=" +
    encodeURIComponent(formValues.message + " ");

  $contactForm.reset();
  window.location.href = mailtoLink;
}

function attachInputListeners($input) {
  $input.addEventListener("blur", handleInputBlur);
  $input.addEventListener("focus", handleInputFocus);
}

$inputs.forEach(attachInputListeners);
$contactForm.addEventListener("submit", handleSubmit);
