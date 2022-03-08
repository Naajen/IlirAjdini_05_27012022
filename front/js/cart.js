//Cherche le produit dans le local storage en format PARSE
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

//Où injecter dans la partie panier
let recapPanier = document.querySelector("#cart__items");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

/*****************************Affiche les produits du localStorage sur la page du panier*****************************/
/********************************************************************************************************************/
const lePanier = () => {
    //parcour le tableau du produit avec toutes les valeurs
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onkeydown="return false;" value=${produitLocalStorage[i].quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
    }
    /******************incrémente ou décrémente la quantité dans le localStorage +/-***********************/
    /******************************************************************************************************/
    const valeurAjouter = () => {
        let btnQuantity = document.querySelectorAll('.itemQuantity');
        for (let x = 0; x < btnQuantity.length; x++) {
            btnQuantity[x].addEventListener('change', (e) => {
                e.preventDefault();
                //transforme la quantité en nombre avec parseInt
                let tabValeur = parseInt(btnQuantity[x].value);
                //Ajuste la valeur au click
                produitLocalStorage[x].quantity = tabValeur;
                //envoi le resultat dans le local storage
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                document.location.reload();
            });
        };
    }
    valeurAjouter ();

    /**************SUPPRIME UN PRODUIT EN FONCTION DE LA COULEUR & ID******************/
    /**********************************************************************************/
    const supprimer = () => {    
        let suppBtn = document.querySelectorAll(".deleteItem")
        for (let l = 0; l < suppBtn.length; l++){
            //Au click du btn on supprime un éléments sur la page & dans le local storage
            suppBtn[l].addEventListener('click', (events) => {
                events.preventDefault();
                //uniqueId est une variable créer dans la page produit pour avoir un idOne unique avec la couleur & l'id ensemble
                let idOne = produitLocalStorage[l].uniqueId 
                //La methode filter permet de choisir la différence dans l'idOne qui ne ressemble à aucun autre produit dans le tableau,vu qu'il est unique. Au lieux d'en prendre 1 et retirer les autres, il enlève celui séléctionné et garde les autres "!==".
                produitLocalStorage = produitLocalStorage.filter(el => el.uniqueId !== idOne);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                document.location.reload();
                alert('Produit supprimé')
                window.location.href = "cart.html";
            });
        }
    }
    supprimer();

    /*****************************TOTAL QUANTITE & PRIX DU PANIER***********************************/
    /***********************************************************************************************/
    const calculPrix_Quantity = () => {
        //déclarer un tableau vide pour y mettre des valeurs
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
        //une fois le tableau rempli on les additionnes grâce au reducer avec une valeur initial de 0 pour évité les erreurs dans la console
        const allArticles = totalArticle.reduce(reducer,0);
        const allPrice = totalPrix.reduce(reducer,0);
        //Ensuite injecte le montant total & la quantité d'article dans le DOM
        totalPrice.innerHTML = `<span id="totalPrice">${allPrice}</span>`;
        totalQuantity.innerHTML = `<span id="totalQuantity">${allArticles}</span>`;
    }
    calculPrix_Quantity();

    /*****************************************FORMULAIRE******************************************/
    /*********************************************************************************************/
    //Espace formulaire
    let formNom = document.getElementById("lastName");
    let formPrenom = document.getElementById("firstName");
    let formAdress = document.getElementById("address");
    let formVille = document.getElementById("city");
    let formMail = document.getElementById("email");
    //Espace erreurs
    let prenomErrorMessage = document.querySelector("#firstNameErrorMsg");  
    let nomErrorMessage = document.querySelector("#lastNameErrorMsg");  
    let addressErrorMessage = document.querySelector("#addressErrorMsg");  
    let cityErrorMessage = document.querySelector("#cityErrorMsg");  
    let emailErrorMessage = document.querySelector("#emailErrorMsg"); 
    //Espace formulaire & le button ajouter au panier
    let formAll = document.getElementsByClassName("cart__order__form");
    let formOrder = document.getElementById("order");
    /**********PRENOM**********/
    formPrenom.addEventListener('change', function() { 
        validPrenom (this);
    })
    const validPrenom = function (btnPrenom) {
            //expression rationnelle afin d'évité certain caractère dans les cases généré sur internet
            let prenomRegExp = new RegExp ("^[a-z]+[ \-']?[[a-z]+[ \-']?]*[a-z]+$", "gi");
            //test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.
            let essaiPrenom = prenomRegExp.test(btnPrenom.value)
            if (essaiPrenom ) {
                prenomErrorMessage.innerHTML = `Prénom Valide ✔`;
                prenomErrorMessage.style.color = '#FFFFFF';
            } else {
                prenomErrorMessage.innerHTML = `${btnPrenom.value} n'est pas valide ✘`;
                btnPrenom.value = "";
                return validPrenom();
            }
    }

    /**********NOM**********/
    formNom.addEventListener('change', function() { 
        validNom (this);
    })
    const validNom = function (btnNom) {
            let nomRegExp = new RegExp ("^[a-z]+[ \-']?[[a-z]+[ \-']?]*[a-z]+$", "gi");
            let essaiNom = nomRegExp.test(btnNom.value)
            if (essaiNom) {  
                nomErrorMessage.innerHTML = "Nom Valide ✔";
                nomErrorMessage.style.color = '#FFFFFF';
            } else {
                nomErrorMessage.innerHTML = `${btnNom.value} n'est pas valide ✘`;
                btnNom.value = "";
                return validNom();
            }

    }

    /**********VILLE**********/
    formVille.addEventListener('change', function() { 
        validVille(this);
    })
    const validVille =  function (btnVille) {
            let villeRegExp = new RegExp (`^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`);
            let essaiVille = villeRegExp.test(btnVille.value) 
            if (essaiVille) {
                cityErrorMessage.innerHTML = "Ville Valide ✔";
                cityErrorMessage.style.color = '#FFFFFF';
            } else {
                cityErrorMessage.innerHTML = `${btnVille.value} n'est pas valide ✘`;
                btnVille.value = "";
                return validVille();
            }
    }

    /**********ADRESSE**********/
    formAdress.addEventListener('change', function() { 
        validAdress(this);
    })
    const validAdress = function (btnAddress) {
            let addressRegExp = new RegExp ('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g'); //rajouter la présence d'un code postal et d'une numéro de rue
            let essaiAddress = addressRegExp.test(btnAddress.value) /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.*/
            if (essaiAddress) {
                addressErrorMessage.innerHTML = "Adresse Valide ✔";
                addressErrorMessage.style.color = '#FFFFFF'; 
            } else {
                addressErrorMessage.innerHTML = `${btnAddress.value} n'est pas valide ✘`;
                btnAddress.value = "";
                return validAdress();
            }
    }

    /**********EMAIL**********/
    formMail.addEventListener('change', function() { 
        validMail(this);
    });
    const validMail = function (btnMail){
            let mailRegExp = new RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$');
            let essaiMail = mailRegExp.test(btnMail.value);
            /* .test vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succèset false dans le cas contraire.*/
            if (essaiMail) {
                emailErrorMessage.innerHTML = "Email Valide ✔";
                emailErrorMessage.style.color = '#FFFFFF';
            } else {
                emailErrorMessage.innerHTML = `"${btnMail.value} n'est pas valide ✘`;
                btnMail.value = "";
                return validMail();
            }

    }
    
    /***********************************COMMANDER***********************************/
    /*******************************************************************************/
    const submitAll = () => {
        const contact = {
            firstName: `${formNom.value}`,
            lastName: `${formPrenom.value}`,
            address: `${formAdress.value}`,
            city: `${formVille.value}`,
            email: `${formMail.value}`
        }
        localStorage.setItem("contact", JSON.stringify(contact));

        let products = []
            for(h = 0; h < produitLocalStorage.length; h++){
                products.push(produitLocalStorage[h].id);
            }
        let envoiProducts = {contact, products};

            fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(envoiProducts),
            headers: {"content-type" : "application/json",}   
        })
        .then(res => {
            return res.json();
        }).then((data) => {
            let orderId = data.orderId;
            window.location.href=`./confirmation.html?id=${orderId}`; 
        }).catch((err) =>{
            console.log(err);
        })
    }
    //formAll.addEventListener("submit", function(evts){})
    
    formOrder.addEventListener("click", function (event) {
        event.preventDefault;
        //Si le formulaire est vide un message d'alert
        if (formNom.value == "" || formPrenom.value == ""|| formAdress.value== "" || formMail.value == "" ||  formVille.value == "" ) {
            alert('Veuillez remplir le formulaire correctement');
            return event.preventDefault();
        } else {
           submitAll();
        }
    });
}

//Si panier vide retour à la page d'acceuil pour séléctionner un produit Sinon accès au Panier +
if (produitLocalStorage === null || produitLocalStorage == 0 || produitLocalStorage == []) {
    alert("Veuillez séléctionné un produit pour continuer vos achats, vous allez être redirigé vers la page d'acceuil");
    window.location.href = "index.html";
} else {
    lePanier();
};

/*
formMail.value =="" || formVille.value =="" || formAdress.value=="" || formPrenom.value =="" || formNom.value ==""
!formMail.value || !formVille.value || !formAdress.value || !formPrenom.value || !formNom.value
!formMail || !formVille || !formAdress || !formPrenom || !formNom
validMail(formMail.value) === false || validVille(formVille.value) === false || validAdress(formAdress.value) === false || validPrenom(formPrenom.value) === false || validNom(formNom.value)=== false
*/