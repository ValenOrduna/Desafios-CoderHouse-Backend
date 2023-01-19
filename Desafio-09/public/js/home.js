const tittle = document.getElementById("tittle");
const logout = document.getElementById("logout");

let username = "";

const generateTittle = () => {
  axios
    .get("/home/user")
    .then((res) => {
      tittle.textContent = `Bienvenido ${res.data.username}`;
      username = res.data.username;
    })
    .catch((error) => console.log(error));
};

generateTittle();
