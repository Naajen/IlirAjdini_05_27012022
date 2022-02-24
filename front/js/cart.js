//Cherche le produit dans le local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

//Selectionné ou injecter
let recapPanier = document.querySelector("#cart__items")
let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")

// Affiche les produits du localStorage sur la page panier
const lePanier = () => {
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
                        <p>Prix : ${produitLocalStorage[i].prix*produitLocalStorage[i].quantity} €</p>
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

    let valeurAjouter = document.querySelectorAll(".itemQuantity");
    for (let j = 0; j < valeurAjouter.length; j++) {
        valeurAjouter[j].addEventListener('click', (events) => {
            let prix = produitLocalStorage[j].prix;
            let quantity = produitLocalStorage[j].quantity;
            let quantity2 = produitLocalStorage[j].quantity++ + 1;
            let prix2 = produitLocalStorage[j].prix*quantity2;
            quantity2;
            prix2;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            //document.location.reload()
        });
    }

    //Parcours le tableau du btn supprimer **************SUPPRIME UN ELEMENT GRACE EN FONCTION DE LA COULEUR*****************
    const supprimer = () => {    
        let suppBtn = document.querySelectorAll(".deleteItem")
        for (let l = 0; l < suppBtn.length; l++){
            //Au click du btn on supprime un éléments sur la page & dans le local storage
            suppBtn[l].addEventListener('click', (events) => {
                events.preventDefault();
                let colorSelect = produitLocalStorage[l].colors;
                //supprimer la selection avec filter() mais en version contraire avec le !==
                produitLocalStorage = produitLocalStorage.filter(el => el.colors !== colorSelect);
                //Met à jour le localstorage
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                
                alert('Produit supprimé')
                window.location.href = "cart.html";
            });
        }
    }    
    supprimer ();
    /*****************************TOTAL QUANTITE & PRIX DU PANIER**********************************/
    //une déclaration de reducer permet d'additionné toutes les valeurs du tableau
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    //déclarer un tableau vide pour y mettre une valeur ici c'est la quantité total
    let totalArticle = [];
    let totalPrix = [];
    //parcourir le tableau
    for (k = 0; k < produitLocalStorage.length; k++) {
        //crée une variable de l'ensemble de la quantité du tableau
        let quantityTotal = produitLocalStorage[k].quantity;
        //grâce au push j'envoi ce tableau dans le tableau au dessus
        totalArticle.push(quantityTotal);

        let quantityPrix = produitLocalStorage[k].prix;
        totalPrix.push(quantityPrix * quantityTotal);
    }
    //une fois le tableau rempli on les additionnes grâce au reducer plus haut avec une valeur initial de 0 pour évité les erreurs dans la console
    const allArticles = totalArticle.reduce(reducer,0)
    const allPrice = totalPrix.reduce(reducer,0)
    //on injecte le montant total dans la bonne balise HTML
    totalPrice.innerHTML = `<span id="totalPrice">${allPrice}</span>`
    totalQuantity.innerHTML = `<span id="totalQuantity">${allArticles}</span>`
}


//Si panier vide retour à la page d'acceuil
if (produitLocalStorage === null || produitLocalStorage == 0 || produitLocalStorage == []) {
    alert("Veuillez séléctionné un produit pour continuer vos achats, vous allez être redirigé vers la page d'acceuil")
    window.location.href = "index.html";
} else {
    //sinon on peut acceder au panier 
    lePanier();
} // prochaine étape le formulaire bien rempli alors le button commander