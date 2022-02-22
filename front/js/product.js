// ici on doit afficher le produit séléctionné avec les informations requise + prix ajuster en euro /10

// Selectionne l'endroit ou prendre les élements
let image = document.querySelector('.item__img')
let prix = document.querySelector('#price')
let titre = document.querySelector('#title')
let descript = document.querySelector('#description')
let colors = document.querySelector('#colors')
let quantity = document.querySelector('#quantity')
let addToCart = document.getElementById("addToCart") //L'id addtocart selectionné


/****************************************ID dans URL*****************************************/
let params = (new URL(document.location)).searchParams;
let id = params.get("id"); //cela récupère l'id en haut dans la console
/****************************************API ID*****************************************/
const urlProduct = fetch("http://localhost:3000/api/products/" + id); //on a pris l'id plus haut id = ${id}
urlProduct
    .then((res) => {
     if (res.ok) {
        return res.json();
    }
    }) 
    .then((value) => { // les données des produits sont stocké ici
        //console.log(value); // nous donne toutes les informations du tableau
        image.innerHTML = // on change la variable pour avoir la bonne source en gardant la même page
            `<div class="item__img">
                <img src="${value.imageUrl}" alt="${value.altTxt}">
            </div>` 
        prix.innerHTML = `<span id="price">${value.price / 10 + ' '}</span>` // on a récupéré le prix et diviser par 10 pour ne pas avoir un prix trop excessif 
        titre.innerHTML = `<h1 id="title">${value.name}</h1>`
        descript.innerHTML = `<p id="description">${value.description}</p>`
        value.colors.forEach(element => {
        colors.innerHTML += `<option value="${element}">${element}</option>`//parcour le tableau des couleurs forEach important!
        })

        /****************************************PANIER & LOCAL STORAGE*****************************************/
        //permet d'avoir la bonne selection de la couleur
        let col = ""
        colors.addEventListener("change", (e) => {
            col = e.target.value;
        })
        //permet d'avoir le bon nombre d'article séléctionné
        let qty = ""
        quantity.addEventListener("change", (e) => {
            qty = parseInt(e.target.value) //changement de valeur JSON en JS
        })
        // Au click de ajouter au panier qu'est ce qu'il se passe ? cela crée une intéraction au click
        addToCart.addEventListener("click", () => {
            //Création d'une variable de la séléction du produit c'est ici que toutes les valeurs vont s'afficher dans le localStorage
            let productSelected = {
                id: value._id,
                name: value.name,
                prix: value.price,
                descript:value.description,
                image: value.imageUrl,
                quantity : qty,
                colors: col
            }
            /***********************Condition de la couleur & quantité***********************/
            // La condition si les éléments couleur & quantité ne sont pas respecter alors message pour choisir apparaitra sinon on lance la commande
            
            if (productSelected.colors == "") {
                alert("Veuillez choisir une couleur") 
            } else if (productSelected.quantity == 0 || productSelected.quantity == "") {
                alert("Choisir la quantité")
            } else {
                stockStorage ();
            }
            console.log(productSelected.quantity);
            //réaliser une incrémentation
            
            // On fait une fonction pour l'ajouter à la condition et comment l'ajout au panier fonctionne ? 
            function stockStorage () {
                // On va convertir le tableau en tableau JS / qui va ensuite se convertir en chaine de caractère JSON / qui dit caractère dit true & qui dit true dit lisible
                let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
                
                //DRY de l'envoi au panier 
                const envoiPanier = () => {
                    produitLocalStorage.push(productSelected); 
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    alert('Produit ajouter')
                }
                /***********************Condition du panier***********************/
                // Si un produit est déjà dans le panier alors on ajoute un produit en+ en chaine de caractère JSON
                if(produitLocalStorage) {
                    //le localStorage ajoute un +1 à la quantité
                    let onePlusQuantity = produitLocalStorage.find(
                        (element) => 
                        //Quand les elements égaux entre eux alors la quantité +1 et si on change de couleur cela crée un autre tableau
                            element.id == productSelected.id && element.colors == productSelected.colors);
                    if (onePlusQuantity) {
                        onePlusQuantity.quantity += productSelected.quantity;
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                        alert('Produit ajouter')
                        return;
                    }
                    envoiPanier();
                } else {
                    //Si le panier est vide, le client envoi le 1er produit en chaine de caractère JSON au clique du "ajouter au panier"
                    produitLocalStorage = []; 
                    envoiPanier ();
                }
            };
        });
    })
    .catch(function (err){
        alert("Veuillez nous excusez, mais les produits ne sont pas disponible pour le moment.")
    })

/*
//Rediriger une fois le choix fait avec un pop'up / évite à l'utilisateur de spam "l'ajouter au panier" évite que la valeur du produit soit répété.
const popupConfirm = () => {
    if (window.confirm(`${productSelected.name} à bien été ajouté au panier, Consultez le panier Ok ou revenir au menu`)) {
        window.location.href = "cart.html";
    } else {
        window.location.href = "index.html";
    }
}
*/