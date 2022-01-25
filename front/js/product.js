//Lien avec l'HTML
const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
console.log(colors);

//Récupération de l'ID du produit
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

//Récupération de l'URL à fetch pour récupérer le produit
const urlFetch = "http://localhost:3000/api/products/" + id;

//Interrogation de l'API pour le produit
fetch(urlFetch)
  //Sinon reponse ok, retour au format json
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  //Afficher les éléments au format HTML
  .then((element) => {
    console.log(element);

    image.innerHTML = `<img src="${element.imageUrl}" alt="${element.altText}">`;
    title.innerHTML = `${element.name}`;
    price.innerHTML = `${element.price}`;
    description.innerHTML = `${element.description}`;
    description.innerHTML = `${element.description}`;
  });
