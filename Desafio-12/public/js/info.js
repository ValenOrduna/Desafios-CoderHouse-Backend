const content = document.getElementById("content");

fetch("info/getInfo")
  .then((response) => response.json())
  .then((data) => {
    for (const element in data) {
      const div = document.createElement("div");
      div.className = "flex justify-between my-5";
      div.innerHTML = `
        <h1>${element}</h1>
        <h2>${data[element]}</h2>`;
      content.appendChild(div);
    }
  });
