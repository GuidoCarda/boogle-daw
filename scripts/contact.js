$contactForm = $(".contact-form");

var validate = {
  email: validateEmail,
  name: validateName,
  message: validateMessage,
};

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
  if (!value.trim().lenght) {
    return "Campo vacio";
  }

  return null;
}

function validateMessage(value) {
  return value.lenght > 5;
}

function getFormValues(elements) {
  var formValues = [];

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.name) {
      formValues.push({ name: element.name, value: element.value });
    }
  }

  return formValues;
}

function handleSubmit(e) {
  e.preventDefault();
  var elements = e.target.elements;
  var formValues = getFormValues(elements);

  formValues.forEach(function (input) {
    var validationMessage = validate[input.name](input.value);
  });

  if (true) return;

  $contactForm.submit();
}

$contactForm.addEventListener("submit", handleSubmit);
