"use strict";
//http://localhost:3000/api/products

let display = "";
const items = document.getElementById("items");

fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((elements) => {
    elements.forEach((element) => {
      display += ` <a href="./product.html?id=${element._id}">
                    <article>
                        <img src="${element.imageUrl}" alt="${element.altTxt}">
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                    </article>
                    </a>`;
    });
    items.innerHTML = display;
  })
  .catch((error) => {
    items.innerHTML = `(${error})`;
  });
