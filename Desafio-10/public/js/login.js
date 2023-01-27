const login = document.getElementById("login");
const formLogin = document.getElementById("form-login");

login.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {};
  const form = new FormData(formLogin);
  form.forEach((value, key) => (user[key] = value));
  fetch("/login", {
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
        return console.log({ Succes: "User Login" });
      }
      location.replace("/register/loginError");
    });
});
