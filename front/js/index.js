let urlProduct = `http://localhost:3000/api/products`; //on se créer une variable de l'url
const allItems = document.querySelector('#items'); //on choisi ou on va injecter 

fetch(urlProduct) //appel depuis le serveur 
.then((res) => { //then = promesse ici on attend une réponse du serveur "un appel ça sonne"
    if (res.ok) {
        return res.json();
    }
})
.then((value) => {
    // console.log(value); nous donne le Array des éléments "c'est la communication entre client(front) et la boutique (back)"
    const values = value; //on change la constante pour avoir toutes les valeurs dans le tableau
    //J'utilise un forEach pour chaque element de values on y met l'id etc..
    values.forEach(element => {
        allItems.innerHTML +=  //le += c'est pour incrementer les autres produits
        `<a href="./product.html?id=${element._id}"> 
            <article>
                <img src="${element.imageUrl}" alt="${element.altTxt}">
                <h3 class="productName">${element.name}</h3>
                <p class="${element.description}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
        </a>`
    });
})
.catch(function (err) {
    alert("Veuillez nous excusez, mais les produits ne sont pas disponible pour le moment.")
});//Quand l'api ne répond pas il y a un message d'erreur