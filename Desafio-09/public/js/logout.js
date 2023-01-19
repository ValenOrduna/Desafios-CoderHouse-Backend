const tittle = document.getElementById("tittle-logout");
const button = document.getElementById("return");

const generateTittle = () => {
  axios
    .get("/home/user")
    .then((res) => {
      tittle.textContent = `Hasta Luego ${res.data.username}`;
    })
    .catch((error) => console.log(error));
};

generateTittle();

button.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "/login";
});
