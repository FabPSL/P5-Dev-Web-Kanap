//Lien avec l'HTML
const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addCart = document.getElementById("addToCart");

//Récupération de l'ID du produit
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

//Récupération de l'URL à fetch pour récupérer le produit
const urlFetch = "http://localhost:3000/api/products/" + id;

//Interrogation de l'API pour le produit
fetch(urlFetch)
  //Si reponse ok, retour au format json
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  //Afficher les éléments au format HTML
  .then((element) => {
    image.innerHTML = `<img src="${element.imageUrl}" alt="${element.altText}">`;
    title.innerHTML = `${element.name}`;
    price.innerHTML = `${element.price}`;
    description.innerHTML = `${element.description}`;
    //insérer couleurs de l'API
    for (let i = 0; i < element.colors.length; i++) {
      colors.innerHTML += `<option value = "${element.colors[i]}"> ${element.colors[i]} </option>`;
    }
  });

//Stockage du produit choisi
addCart.addEventListener("click", (e) => {
  const product = {
    id: id,
    image: image.value,
    name: title.value,
    quantity: quantity.value,
    price: price.value,
    colors: colors.value,
  };
  console.log(e);
  console.log(product);
  addToCart(product);
});

//Enregistrer le panier dans le localStorage
//La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart)); //JSON.stringify transforme le tableau en chaîne de caractère
  console.log(cart);
}

//Récupérer le produit enregistré dans le localStorage
//La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

//Ajouter au panier
function addToCart(product) {
  let cart = getCart();
  let foundProduct = cart.find(
    (p) => p.id == product.id && p.colors == product.colors
  ); //Chercher dans le tableau dont l'ID est égal à au produit à ajouter
  if (foundProduct != undefined) {
    //Si le produit existe déjà, on ajoute 1 à la quantité
    foundProduct.quantity += product.quantity;
  } else {
    cart.push(product); // La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
  }
  saveCart(cart);
}
