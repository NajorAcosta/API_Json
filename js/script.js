var imgURL = 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png?fit=641%2C618&ssl=1';
var content = document.querySelector('.content');
var btn = document.getElementById('btn');

// Imagen manzana

const createImgFromBlob = blob => {
    const img = new Image();

    img.src = URL.createObjectURL(blob);

    return img;
};

const addToContent = element => {
    content.appendChild(element);
};

const logStatus = response => {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);

    return response;
};

const checkResponse = response => {
    if(!response.ok) throw new Error ('Status code not found');

    return response;
};

btn.addEventListener('click', function(ev){
    ev.preventDefault();

    fetch(imgURL)
        .then(logStatus)
        .then(checkResponse)
        .then(response => response.blob())
        .then(createImgFromBlob)
        .then(addToContent)
        .catch(ex => console.log(ex))
});

// POST y GET JSON

let baseURL = 'http://20.123.169.43:8080/BatidosRestAuto-1.0-SNAPSHOT/api';
var btn2 = document.getElementById('btn2');

const addToContentJson = text => {
    content.innerHTML = text
}

const post = (url, body, headers = {}) => fetch(url, {method: 'POST', body, headers});

btn2.addEventListener('click', (ev) => {
    ev.preventDefault();
    const body = JSON.stringify({"frutas": "[Melon, pera, pina]", "extras": "Leche Avena, Leche, Almendra"})
    post(`${baseURL}/batidos`, body, {'Content-Type': 'application/json'})    
        .then(response => response.json())
        .then(({idBatido}) => idBatido)
        .then(addToContentJson)
});

btn.addEventListener("click", (ev) => {
  ev.preventDefault();
  fetch(`${baseURL}/batidos`)
    .then((response) => response.json())
    .then(console.log);

  fetch(`${baseURL}/batidos/55`)
    .then((response) => response.json())
    .then(console.log);

  fetch(`${baseURL}/frutas`)
    .then((response) => response.json())
    .then(console.log);

  fetch(`${baseURL}/frutas/Precio?fruta=pina`)
    .then((response) => response.json())
    .then(console.log);
});