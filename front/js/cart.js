const saveCart = JSON.parse(localStorage.getItem("cart"));
console.log(saveCart);

// parcours de la variable du saveCart
saveCart.forEach((element) => {
  const urlFetch = "http://localhost:3000/api/products/" + element.id;
  fetch(urlFetch)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((element) => {
      const html = `<article class="cart__item" data-id="${element._id}" data-color="${element.colors}">
      <div class="cart__item__img">
        ${element.imgageURL}
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${element.name}</h2>
          <p>${element.colors}</p>
          <p>${element.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      cart = document.getElementById("cart__items");
      cart.innerHTML += html;
    });
});
