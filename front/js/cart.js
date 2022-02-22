//Cherche le produit dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//les produits du localStorage tableau 

//Selectionné ou injecter
let recapPanier = document.querySelector("#cart__items")
let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")

for (i = 0; i < produitLocalStorage.length; i++) {
    recapPanier.innerHTML +=
    `<article class="cart__item" data-id=${produitLocalStorage[i].id} data-color=${produitLocalStorage[i].colors}>
        <div class="cart__item__img">
            <img src=${produitLocalStorage[i].image} alt="${produitLocalStorage[i].altTxt}é">
        </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>Produit : ${produitLocalStorage[i].name}</h2>
                    <p>Couleur : ${produitLocalStorage[i].colors}</p>
                    <p>${produitLocalStorage[i].prix} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produitLocalStorage[i].quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`

}
//déclarer un tableau pour y mettre la quantité total
let totalArticle = [];
for (k = 0; k < produitLocalStorage.length; k++) {
    //crée une variable de l'ensemble de la quantité
    let quantityTotal = produitLocalStorage[k].quantity;
    //envoi la quantité dans un tableau
    totalArticle.push(quantityTotal)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue
const allArticles = totalArticle.reduce(reducer,0)
totalQuantity.innerHTML = `<span id="totalQuantity">${allArticles}</span>`

console.log(produitLocalStorage);

let totalPrix = [];

for (j = 0; j < produitLocalStorage.length; j++) {
    let quantityPrix = produitLocalStorage[j].prix;
    totalPrix.push(quantityPrix)
    console.log(totalPrix);
}
const allPrice = totalPrix.reduce(reducer,0)
totalPrice.innerHTML = `<span id="totalPrice">${allPrice}</span>`


/*//Si le panier est vide : afficher le panier est vide
if (produitLocalStorage === null) {
    alert("Le panier est vide")
} else {

}*/

//totalQuantity.innerHTML += `<span id="totalQuantity">${produitLocalStorage[k].quantity}</span>`