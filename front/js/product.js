// ici on doit afficher le produit séléctionné avec les informations requise + prix ajuster en euro /10

//on va créer une variable pour chercher ou les produits vont aller
let image = document.querySelector('.item__img')
let prix = document.querySelector('#price')
let titre = document.querySelector('#title')
let descript = document.querySelector('#description')
let couleur = document.querySelector('#colors')
// let allContent = document.querySelectorAll('')
//On va chercher appeler l'id de l'url dans la console
let params = (new URL(document.location)).searchParams;
let id = params.get("id"); //cela récupère l'id en haut dans la console 


let urlProduct = `http://localhost:3000/api/products/${id}`;
fetch(urlProduct)
.then((res) => { 
    if (res.ok) {
        return res.json();
    }
})
.then((value) => {
    console.log(value.imageUrl, value.altTxt, value.price, value.name, value.description, value.colors);
    image.innerHTML =
        `<div class="item__img">
            <img src="${value.imageUrl}" alt="${value.altTxt}">
        </div>`
    prix.innerHTML = `<span id="price">${value.price / 10 + ' '}</span>`
    titre.innerHTML = `<h1 id="title">${value.name}</h1>`
    descript.innerHTML = `<p id="description">${value.description}</p>`
    couleur.innerHTML = `<option value="">${value.colors}</option>` // revoir pour avoir un bon choix sur les couleurs
});  


/* stock des données utilisateur pour plusieurs visites contrairement aux getItem qui lui possède un délais d'expiration
localStorage.setItem("id", id)*/

// Il faudrait reussir à les stocké tout les éléments

// voir comment ça fonctionne // json // */
