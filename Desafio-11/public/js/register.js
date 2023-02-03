const register = document.getElementById("register");
const formRegister = document.getElementById("form-register");

register.addEventListener("click", (e) => {
  e.preventDefault();
  const form = new FormData(formRegister);
  const user = {};
  form.forEach((value, key) => (user[key] = value));

  fetch("/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .then((json) => {
      if (json.status === 300) {
        location.replace("/home");
        return console.log({ Succes: "User Created" });
      }
      location.replace("/register/registerError");
    });
});
