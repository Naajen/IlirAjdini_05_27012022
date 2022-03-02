//Cherche le produit dans le local storage en format PARSE
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

//Ou injecter dans la partie panier
let recapPanier = document.querySelector("#cart__items");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

//Ou injecter dans la partie formulaire
let formulaire = document.getElementsByClassName("cart__order__form");
let formNom = document.getElementById("lastName");
let formPrenom = document.getElementById("firstName");
let formAdress = document.getElementById("address");
let formVille = document.getElementById("city");
let formMail = document.getElementById("email");
let formOrder = document.getElementById("order");

/*****************************Affiche les produits du localStorage sur la page panier*****************************/
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
                        <p>Prix : ${produitLocalStorage[i].prix} €</p>
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
        </article>`;

        const calculPrix_Quantity = () => {
        /*****************************TOTAL QUANTITE & PRIX DU PANIER***********************************/
        //déclarer un tableau vide pour y mettre une valeur ici c'est la quantité total
        let totalArticle = [];
        let totalPrix = [];
        //parcourir le tableau
        for (k = 0; k < produitLocalStorage.length; k++) {
        //crée une variable de l'ensemble de la quantité du tableau
       let quantityTotal = produitLocalStorage[k].quantity;
        //grâce au push j'envoi le tableau de quantité au total d'article
        totalArticle.push(quantityTotal);
        //Mais on envoi aussi le prix pour rester dynamique dans le prix
        let quantityPrix = produitLocalStorage[k].prix;
        //Le prix s'adapte en fonction de la quantité
        totalPrix.push(quantityPrix * quantityTotal);
        }
        //une déclaration de reducer permet d'additionné toutes les valeurs du tableau
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        //une fois le tableau rempli on les additionnes grâce au reducer variable en haut avec une valeur initial de 0 pour évité les erreurs dans la console
        const allArticles = totalArticle.reduce(reducer,0);
        const allPrice = totalPrix.reduce(reducer,0);
        //on injecte le montant total dans la bonne balise HTML
        totalPrice.innerHTML = `<span id="totalPrice">${allPrice}</span>`;
        totalQuantity.innerHTML = `<span id="totalQuantity">${allArticles}</span>`;
        }
        calculPrix_Quantity();

    }

    let btnQuantity = document.querySelectorAll('.itemQuantity');
    for (let x = 0; x < btnQuantity.length; x++) {
        btnQuantity[x].addEventListener('change', (e) => {
            e.preventDefault();
            let tabValeur = parseInt(btnQuantity[x].value);
            produitLocalStorage[x].quantity = tabValeur;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            document.location.reload();
        });
    };

    //Parcours le tableau du btn supprimer **************SUPPRIME UN ELEMENT GRACE EN FONCTION DE LA COULEUR*****************
    const supprimer = () => {    
        let suppBtn = document.querySelectorAll(".deleteItem")
        let itemSelected = document.querySelectorAll('.cart__item');

        console.log(itemSelected);
        for (let l = 0; l < itemSelected.length; l++){
            //Au click du btn on supprime un éléments sur la page & dans le local storage
            suppBtn[l].addEventListener('click', (events) => {
                events.preventDefault();
                let idOne = produitLocalStorage[l].uniqueId
                produitLocalStorage = produitLocalStorage.filter(el => el.uniqueId !== idOne);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                document.location.reload();
                alert('Produit supprimé')
                window.location.href = "cart.html";
            });
        }
    }
    supprimer();



}
const  leFormulaire = () => {

    
    /*****************************************PRENOM******************************************/
    formPrenom.addEventListener('change', function() { 
        validPrenom (this);
    })
    const validPrenom = (btnPrenom) => {
            let prenomRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
            let essaiPrenom = prenomRegExp.test(btnPrenom.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.*/
            if (essaiPrenom) {
                document.getElementById("firstNameErrorMsg").innerHTML = `Valide ✔`
                document.getElementById("firstNameErrorMsg").style.color = 'white'   
            } else {
                document.getElementById("firstNameErrorMsg").innerHTML = `${btnPrenom.value} n'est pas valide ✘`
            }
    }
    /*****************************************NOM******************************************/
    formNom.addEventListener('change', function() { 
        validNom (this);
    })
    const validNom = (btnNom) => {
            //'g'
            let nomRegExp = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
            let essaiNom = nomRegExp.test(btnNom.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.*/
            if (essaiNom) {  
                document.getElementById("lastNameErrorMsg").innerHTML = "Valide ✔"
                document.getElementById("lastNameErrorMsg").style.color = 'white'  
            } else {
                document.getElementById("lastNameErrorMsg").innerHTML = `${btnNom.value} n'est pas valide ✘`
            }
    }
    /*****************************************Ville******************************************/
    formVille.addEventListener('change', function() { 
        validVille(this);
    })
    const validVille = (btnVille) => {
            let villeRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
            let essaiVille = villeRegExp.test(btnVille.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.*/
            if (essaiVille) {
                document.getElementById("cityErrorMsg").innerHTML = "Valide ✔"
                document.getElementById("cityErrorMsg").style.color = 'white'  
            } else {
                document.getElementById("cityErrorMsg").innerHTML = `${btnVille.value} n'est pas valide ✘`
            }
    }
    /*****************************************Adresse******************************************/
    formAdress.addEventListener('change', function() { 
        validAdress(this);
    })
    const validAdress = (btnAddress) => {
            let addressRegExp = new RegExp ('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g'); //rajouter la présence d'un code postal et d'une numéro de rue
            let essaiAddress = addressRegExp.test(btnAddress.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.*/
            if (essaiAddress) {
                document.getElementById("addressErrorMsg").innerHTML = "Valide ✔"
                document.getElementById("addressErrorMsg").style.color = 'white'  
            } else {
                document.getElementById("addressErrorMsg").innerHTML = `${btnAddress.value} n'est pas valide ✘`
            }
    }
    /*****************************************MAIL******************************************/
    formMail.addEventListener('change', function() { 
        validMail(this);
    })
    const validMail = (btnMail) => {
            let mailRegExp = new RegExp ('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
            let essaiMail = mailRegExp.test(btnMail.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succèset false dans le cas contraire.*/
            if (essaiMail) {
                document.getElementById("emailErrorMsg").innerHTML = "Valide ✔"
                document.getElementById("emailErrorMsg").style.color = 'white'
            } else {
                document.getElementById("emailErrorMsg").innerHTML = `"${btnMail.value} n'est pas valide ✘`
            }
    }
        
    /*****************************************Envoyer le formulaire dans le localStorage en clé contact!******************************************/
    formOrder.addEventListener("click", function (event) {
        event.preventDefault;
        //Si le formulaire est vide un message d'alert
        if (formNom.value == "" || formPrenom.value== "" || formAdress.value== "" || formVille.value == "" || formMail.value== "") {
            //message d'alert au cas ou les champs ne sont pas
            alert('veuillez remplir tous les champs au dessus et cliquer')
            return event.preventDefault();
        } else {
            const contact = {
                firstName: `${formNom.value}`,
                lastName: `${formPrenom.value}`,
                address: `${formAdress.value}`,
                city: `${formVille.value}`,
                email: `${formMail.value}`
            }
            localStorage.setItem("contact", JSON.stringify(contact));

            let products = []
                for(i = 0; i < produitLocalStorage.length; i++){
                    products.push(produitLocalStorage[i].id)
                }
            let envoiProducts = {contact, products}
            console.log(envoiProducts);

                fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(envoiProducts),
                headers: {"content-type" : "application/json",}   
            })
            .then(res => {
                return res.json();
            }).then((data) => {
                let orderId = data.orderId
                window.location.href= `./confirmation.html?id=${orderId}` ; 
            }).catch((err) =>{
                console.log(err);
            })
        }
    });
}
leFormulaire ();

//Si panier vide retour à la page d'acceuil Sinon accès au Panier
if (produitLocalStorage === null || produitLocalStorage == 0 || produitLocalStorage === []) {
    alert("Veuillez séléctionné un produit pour continuer vos achats, vous allez être redirigé vers la page d'acceuil");
    window.location.href = "index.html";
} else {
    lePanier();
    leFormulaire();
};


/*
const request = {
method: "POST",
body: JSON.stringify(order),
headers: { "Content-Type": "application/json" },
};
*/

/* 
let colorSelect = produitLocalStorage[l].colors;
//supprimer la selection avec filter() mais en version contraire avec le !==
produitLocalStorage = produitLocalStorage.filter(el => el.colors !== colorSelect);
//Met à jour le localstorage
localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
alert('Produit supprimé')
window.location.href = "cart.html";
*/