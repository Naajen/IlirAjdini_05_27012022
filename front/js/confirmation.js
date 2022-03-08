//Recupère l'id via Url
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);
//Je choisi ou injecter l'order id
const numOrder = document.getElementById("orderId");
console.log(numOrder);
//j'injecte l'id dans le numéro de commande 
numOrder.innerHTML = id
localStorage.clear()//On efface tout du local storage