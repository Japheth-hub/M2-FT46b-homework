let btnAmigos = document.getElementById("boton");
let listaAmigos = document.getElementById("lista");
let url  = `http://localhost:5000/amigos/`;
let arrayAmigos = [];
let input = document.getElementById("input");
let btnSearch = document.getElementById("search");
let spanAmigo = document.getElementById("amigo");
let inputDelete = document.getElementById("inputDelete");
let btnDelete = document.getElementById("delete");
let spanBorrado = document.getElementById("success");


// Consumimos la API mediante fetch para traer a los amigos llamando a la fncion mostrarAmigos
btnAmigos.addEventListener("click",function(){
    spanAmigo.innerText = "";
    spanBorrado.innerText = "";
    fetch(url)
        .then((res) => res.json())
        .then(amigos => mostrarAmigos(amigos))
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        })
})
//-----------------------------------------Funcion mosrarAmigos-----------------------------------------------
function mostrarAmigos(amigos){
    listaAmigos.innerHTML = "";
    let h2 = document.querySelector("h2");
    h2.innerHTML = "";
    let img = document.querySelector("img");
    img.src = ""; 
    for(let amigo of amigos){
        let li = document.createElement("li")
        li.innerText = amigo.name;
        listaAmigos.appendChild(li);
    }
}//-------------------------------------------------------------------------------------------------------------


// -----------------------------------------Obtener Amigo por ID------------------------------------------------
btnSearch.addEventListener("click", function(){
    spanBorrado.innerText = "";
    fetch(url + input.value)
        .then(res => res.json())
        .then(amigo => {
            input.value = "";
            spanAmigo.innerText = amigo.name;
        })
        .catch(error => {
            input.value = "";
            spanAmigo.innerText = "No existe";
        })
})//-------------------------------------------------------------------------------------------------------------


// ----------------------------------------------Borrar amigo----------------------------------------------------
btnDelete.addEventListener("click", function(){
    spanAmigo.innerText = "";
    fetch(url+inputDelete.value, {
        method : "DELETE"
    })
        .then(res => {
            spanBorrado.innerText = "Su amigo a sido borrado de su lista de Amix";
            inputDelete.value = "";
        })
})
