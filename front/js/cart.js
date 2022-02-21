//Cherche le produit dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//les produits du localStorage tableau 
console.log(produitLocalStorage);

//Selectionné ou injecter
let cartItem = document.getElementById("cart__items")
let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")

console.log(cartItem);
console.log(totalQuantity);
console.log(totalPrice);

//Si le panier est vide : afficher le panier est vide
if (produitLocalStorage === null) {
    alert("Le panier est vide")
} else {
    console.log('ya des trucs');
}//Validation du pannier/ afficher le prix total/ rentrer les coordonnées/ valider la commande

