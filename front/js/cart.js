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
    let formOrder = document.getElementById("order");

    //verif expression regulière
    function prenomControl () {
        let regexPrenom = formPrenom.value;
        if (/^[A-Za-z]{2,30}$/.test(regexPrenom)) {
            prenomErrorMessage.innerHTML = 'Valide'
            prenomErrorMessage.style.color = '#ffffff'
            formPrenom.style.boxShadow =''
            formPrenom.style.boxSizing = ''
            return true;
        } else {
            formPrenom.style.boxShadow ='0px 0px 10px #FF0000'
            formPrenom.style.boxSizing = 'border-box'
            prenomErrorMessage.innerHTML = 'Invalide'
            return false;
        }
    }

    function nomControl () {
        let regexNom = formNom.value;
        if (/^[A-Za-z]{2,30}$/.test(regexNom)) {
            nomErrorMessage.innerHTML = 'Valide'
            nomErrorMessage.style.color = '#ffffff'
            formNom.style.boxShadow =''
            formNom.style.boxSizing = ''
            return true;
        } else {
            nomErrorMessage.innerHTML = 'Invalide'
            formNom.style.boxShadow ='0px 0px 10px #FF0000'
            formNom.style.boxSizing = 'border-box'
            return false;
        }
    }

    function cityControl () {
        let regexCity = formVille.value;
        if (/^[A-Za-z]{2,30}$/.test(regexCity)) {
            cityErrorMessage.innerHTML = 'Valide'
            cityErrorMessage.style.color = '#ffffff'
            formVille.style.boxShadow =''
            formVille.style.boxSizing =''
            return true;
        } else {
            cityErrorMessage.innerHTML = 'Invalide'
            formVille.style.boxShadow ='0px 0px 10px red'
            formVille.style.boxSizing = 'border-box'
            return false;
        }
    }
    
    function addressControl () {
        let regexAddress = formAdress.value;
        if (/^[a-zA-Z0-9\s,.'-]{3,}$/ .test(regexAddress)) {
            addressErrorMessage.innerHTML = 'Valide'
            addressErrorMessage.style.color = '#ffffff'
            formAdress.style.boxShadow =''
            formAdress.style.boxSizing =''
        } else {
            addressErrorMessage.innerHTML = 'Invalide'
            formAdress.style.boxShadow ='0px 0px 10px red'
            formAdress.style.boxSizing = 'border-box'
            return false;
        }
    }
    
    function mailControl () {
        let regexMail = formMail.value;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(regexMail)) {
            emailErrorMessage.innerHTML = 'Valide'
            emailErrorMessage.style.color = '#ffffff'
            formMail.style.boxShadow =''
            formMail.style.boxSizing =''
        } else {
            emailErrorMessage.innerHTML = 'Invalide'
            formMail.style.boxShadow ='0px 0px 10px red'
            formMail.style.boxSizing = 'border-box'
            return false;
        }
    }

    /***********************************COMMANDER***********************************/
    /*******************************************************************************/
    const  submitAll = async () => {
        const contact = {
            firstName: `${formPrenom.value}`,
            lastName: `${formNom.value}`,
            city: `${formVille.value}`,
            address: `${formAdress.value}`,
            email: `${formMail.value}`
        }
        localStorage.setItem("contact", JSON.stringify(contact));
        
        let products = []
            for(h = 0; h < produitLocalStorage.length; h++){
                products.push(produitLocalStorage[h].id);
            }

        let envoiProducts =  {contact, products};
        console.log(envoiProducts);
        
        await fetch("http://localhost:3000/api/products/order", {
        
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
    formOrder.addEventListener("click", (e) => {
        e.preventDefault()
        if (prenomControl() === false || nomControl() === false || addressControl() === false || cityControl() === false || mailControl () === false) {
            const commander = document.getElementById('order')
            commander.setAttribute('value', 'Veuillez remplir tous les champs et cliquer')
            return e.preventDefault();
        } else {
            submitAll();
        }
    })
}

//Si panier vide retour à la page d'acceuil pour séléctionner un produit Sinon accès au Panier +
if (produitLocalStorage === null || produitLocalStorage === 0 || produitLocalStorage === []) {
    alert("Veuillez séléctionné un produit pour continuer vos achats, vous allez être redirigé vers la page d'acceuil");
    window.location.href = "index.html";
} else {
    lePanier();
};