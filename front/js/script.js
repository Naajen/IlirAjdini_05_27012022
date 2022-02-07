let urlProduct = `http://localhost:3000/api/products`;
const allItems = document.querySelector('#items');

fetch(urlProduct)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        // console.log(value);
        const values = value;
        values.forEach(element => {
            allItems.innerHTML += 
            `<a href="./product.html?id=${element._id}">
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}">
                    <h3 class="productName">${element.name}</h3>
                    <p class="${element.description}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
             </a>`
        });
    });
