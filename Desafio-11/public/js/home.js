const tittle = document.getElementById("tittle");
const logout = document.getElementById("logout");

const uploadTittle = () => {
  fetch("/home/user")
    .then((response) => response.json())
    .then((data) => (tittle.textContent = data.username));
};

uploadTittle();

logout.addEventListener("click", (e) => {
  location.replace("/home/logout");
});
