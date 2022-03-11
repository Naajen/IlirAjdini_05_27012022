/*******************Selectionne l'endroit ou injecter les élements ***************************/
/********************************************************************************************/
let image = document.querySelector('.item__img')
let prix = document.querySelector('#price')
let titre = document.querySelector('#title')
let descript = document.querySelector('#description')
let colors = document.querySelector('#colors')
let quantity = document.querySelector('#quantity')
let altTxt = document.querySelector('#altTxt')
let addToCart = document.getElementById("addToCart")


/****************************************ID dans URL*****************************************/
/********************************************************************************************/

// Cela permet de récuperer l'id en haut dans l'URL parse url
let params = (new URL(document.location)).searchParams;
let id = params.get("id");

/****************************************API ID*****************************************/
/***************************************************************************************/

// J'ai pris l'id plus haut "id = ${id}" que j'ai ajouter a l'url du fetch pour qu'il me donne une page avec id concatener l'url + id 
const urlProduct = fetch(`http://localhost:3000/api/products/` + id);
urlProduct
    .then((res) => {
     if (res.ok) {
        return res.json();
    }
    }) 
    .then((value) => { // les données des produits sont stocké ici
        //console.log(value); // nous donne toutes les valeurs du produit séléctionné
        /*On inject dans le DOM l'image du produit qui s'adapte en fonction des valeurs, ici pas besoin de mettre += car il n'y a qu'un seul produit*/
        image.innerHTML = 
            `<div class="item__img">
                <img src="${value.imageUrl}" alt="${value.altTxt}">
            </div>` 
        prix.innerHTML = `<span id="price">${value.price + ' '}</span>`
        titre.innerHTML = `<h1 id="title">${value.name}</h1>`
        descript.innerHTML = `<p id="description">${value.description}</p>`
        value.colors.forEach(element => {
        colors.innerHTML += `<option value="${element}">${element}</option>`//parcour le tableau des couleurs forEach important!
        })

        /****************************************PANIER & LOCAL STORAGE*****************************************/
        /*******************************************************************************************************/

        //permet d'afficher un tableau déroulant des couleurs sinon tout est sur une seul et même ligne 
        let col = ""
        colors.addEventListener("change", (e) => {
            col = e.target.value;
        })
        //permet d'avoir le bon nombre de quantité séléctionné et il s'incremente en JS il devient un nombre dans le localStorage
        let qty = ""
        quantity.addEventListener("change", (e) => {
            qty = parseInt(e.target.value) //changement de valeur JSON en JS
        })
        // Au click de ajouter au panier qu'est ce qu'il se passe ? action au click
        addToCart.addEventListener("click", () => {
            //Création d'une variable de la séléction du produit, toutes les valeurs vont s'afficher dans le localStorage
            let productSelected = {
                id: value._id,
                name: value.name,
                prix: value.price,
                descript:value.description,
                altTxt:value.altTxt,
                image: value.imageUrl,
                quantity : qty,
                colors: col,
                uniqueId: id + col //création d'une uniqueId pour le panier pour la suppréssion d'article
            }

            /*********************************Condition de la couleur & quantité************************************/
            /*******************************************************************************************************/

            // La condition si les éléments couleur & quantité ne sont pas respecter alors message pour choisir apparaitra sinon on lance la commande
            
            if (productSelected.colors == "") {
                alert("Veuillez choisir une couleur") ;
            } else if (productSelected.quantity == 0 || productSelected.quantity == "") {
                alert("Choisir la quantité");
            } else if (productSelected.quantity >= 100){    
                alert ("Stock limité à 100 articles")
            } else {
                stockStorage ();
            }

            // On fait une fonction pour l'ajouter à la condition et comment l'ajout au panier fonctionne ? 
            function stockStorage () {
                // On va convertir le tableau en tableau JS / Pour être sûr d'avoir la bonne écriture en JS
                let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
                
                //DRY de l'envoi au panier 
                const messAjout = alert('Produit ajouter à votre panier')
                const envoiPanier = () => {
                    //envoi les données dans le localStorage
                    produitLocalStorage.push(productSelected);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    messAjout
                }
                /***********************Condition du panier***********************/
                /*****************************************************************/
                // Si un produit est déjà dans le panier alors on ajoute un produit en+ en chaine de caractère JSON
                if(produitLocalStorage) {
                    //le localStorage ajoute un +1 à la quantité en fonction des couleurs & id
                    let onePlusQuantity = produitLocalStorage.find(
                        (element) => 
                            //Quand les elements égaux entre eux alors la quantité +1 et si on change de couleur cela crée un autre tableau avec une couleur différente
                            element.id == productSelected.id && element.colors == productSelected.colors);   
                    if (onePlusQuantity) {
                        //incremente la quantité
                        onePlusQuantity.quantity += productSelected.quantity;
                        //Calcul du prix en fonction de la quantité
                        onePlusQuantity.prix += productSelected.prix*productSelected.quantity; 
                        //On envoi en chaine de caratère dans le localStorage
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        messAjout;
                        return;
                    }
                    //le prix s'adapte à la quantité au changement de couleur
                    productSelected.prix = productSelected.prix*productSelected.quantity;
                    envoiPanier();
                } else {
                    //Si le panier est vide, le client envoi le 1er produit en chaine de caractère JSON au clique du "ajouter au panier"
                    produitLocalStorage = [];
                    //le prix s'adapte à la quantité
                    productSelected.prix = productSelected.prix*productSelected.quantity;
                    envoiPanier ();
                }
            };
        });
    })
    .catch(function (err){
        alert("Veuillez nous excusez, mais les produits ne sont pas disponible pour le moment.")
    })