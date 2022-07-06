//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets=[];



//eventListener
eventListener();
function eventListener(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweets)

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        //convierte el string local al objeto y se guarda en la variable y envia arreglo vacio si no tiene almacenado
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        mostrarTweetHtml();
    })

    
}

//funciones
function agregarTweets(e){
    e.preventDefault();
    //text area donde el usuario escriba
    const tweet = document.querySelector('#tweet').value;
    
    //validacion del agregar tweet
    if (tweet===''){
        mostrarError('El tweet no puede ir vacio');
        return;// evita que se siga ejecuntando mas lineas de codigo.
    }
    
    //anadir arreglo de tweets
    const tweetObj={
        id:Date.now(),//guarda fecha de registro
        tweet // texto: tweet //si tiene el mismo nombre llave y valor, puedes colocar solo un nombre
    }
    tweets=[...tweets,tweetObj];
     
    // una vez agregao el tweet en el arreglo, crear el HTML
    mostrarTweetHtml();

    //reiniciar el formulario
    formulario.reset();
    
}

function mostrarError(error){
    const errorHTML = document.createElement('p');
    errorHTML.textContent=error;
    errorHTML.classList.add('error');

    // inserta el mensaje en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(errorHTML);
    
    //elimina la alerta despues de 3 seg
    setInterval(()=> {
        errorHTML.remove();
    },3000)
}

//muestra un listado de los tweets
function mostrarTweetHtml(){

    limpiarHTML();
    if (tweets.length > 0){ // si el objeto contiene algo entonces...
        //como es un objeto hay que recorrer cada elemento para mostrar el valor
        tweets.forEach(tweet =>{
            //crear agregar bonton HTML
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML='X'

            //anadir funcion de eliminar
            btnEliminar.onclick=()=>{
                borrarTW(tweet.id);
            }

            //crear el HTML
            const li= document.createElement('li');

            //anadir el texto al listado creado
            li.innerText=tweet.tweet;

            //insertar el boton eliminar en el HTML
            li.appendChild(btnEliminar);
            
            //insertar el listado en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizaStorage();
}

// funcion borrar tweet
function borrarTW(id){
    tweets= tweets.filter(tw => tw.id !== id);

    mostrarTweetHtml();
}

//agrega los tweets actuales  a localStorage
function sincronizaStorage (){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//limpia el HTML
function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}