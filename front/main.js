//http://localhost:3000/api/products

let display = "";

fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((value) => {
    value.forEach((element) => {
      display += ` <a href="./product.html?id=${element._id}">
                    <article>
                        <img src="${element.imageUrl}" alt="${element.altTxt}">
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                    </article>
                    </a>`;
    });
    items = document.getElementById("items");
    items.innerHTML = display;
  })
  .catch((error) => {
    products.innerHTML = `(${error})`;
  });
