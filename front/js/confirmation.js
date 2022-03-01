// RECUPERATION ORDERID PRODUIT
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

const nbOrder = document.getElementById("orderId");
nbOrder.innerHTML = id
localStorage.clear()//un recap de la commande