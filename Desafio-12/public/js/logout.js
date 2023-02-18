const tittle = document.getElementById("tittle-logout");

const uploadTittle = () => {
  fetch("/home/user")
    .then((response) => response.json())
    .then((data) => {
      tittle.textContent = `Adios ${data.username}`;
      setTimeout(() => {
        fetch("logout/destroy").finally(() => location.replace("/login"));
      }, 3000);
    });
};

uploadTittle();
