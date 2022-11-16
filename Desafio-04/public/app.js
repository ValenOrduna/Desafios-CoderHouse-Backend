const form = document.getElementById("form-products");

const handleSubmit = (e, form, route) => {
  e.preventDefault();
  const formData = new FormData(form);
  let product = {};
  formData.forEach((value, key) => (product[key] = value));
  fetch(route, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

form.addEventListener("submit", (e) =>
  handleSubmit(e, e.target, "/api/productos")
);
