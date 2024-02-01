//variables
let limiteMax = 10;
let intentosMax = 3;
let numeroSecreto = 0;
let intentos;
let listaNumerosSorteados = [];

//botones
// function intentoDeUsuario() {
//    alert("Click desde botón");
// }

//funciones varias
function asignarTextoElemento(elemento, texto) {
   let elementoHTML = document.querySelector(elemento);
   elementoHTML.innerHTML = texto;
}

function almacenarEnLista(numeroSecreto) {
   listaNumerosSorteados.push(numeroSecreto);
}

/*Generar número aleatorio*/
function generarNumeroSecreto(limiteMax) {
   let numeroAleatorio = parseInt(
      Math.floor(Math.random() * limiteMax) + 1
   );
   console.log(numeroAleatorio);
   console.log(listaNumerosSorteados);
   //si el número aleatorio ya está en la lista, repetir la operación
   if (validadorNumeroSecreto(numeroAleatorio) === true) {
      generarNumeroSecreto(limiteMax);
   }
   //Si se han sorteado todos los numeros, avisar y cerrar;
   if (listaNumerosSorteados.length == limiteMax) {
      asignarTextoElemento(
         "p",
         "Ya se han sorteado todos los números posibles."
      );
   }
   return numeroAleatorio;
}

/*verificar si el número se encuentra en la lista*/
function validadorNumeroSecreto(numero) {
   // Si el numero está incluido en la lista, repetir; sino almacenar en la lista.
   listaNumerosSorteados.includes(numero);
}

/*Verificar cantidad de intentos por jugada*/
function validadorIntentosJugada(numero) {
   if (numero >= intentosMax) {
      asignarTextoElemento("p", "Ya has agotado los intentos.");
   } else {
      asignarTextoElemento(
         "p",
         `Intenta nuevamente. Te ${
            intentos === 1 ? "queda" : "quedan"
         } ${intentos} ${intentos === 1 ? "intento" : "intentos"}`
      );
   }
}

function comparador(num1, num2) {
   if (num1 > num2) {
      return true;
   }
}

function contador() {
   intentos++;
}

function limpiarCelda() {
   document.querySelector("#valorUsuario").value = "";
}

//Funciones principales//

function condicionesIniciales() {
   asignarTextoElemento("h1", "Hora del Desafío");
   asignarTextoElemento("p", `Ingresa un número del 1 al ${limiteMax}`);
   numeroSecreto = generarNumeroSecreto(limiteMax);
   listaNumerosSorteados.push(numeroSecreto);
   intentos = 1;
}

function reiniciarJuego() {
   // limpiar celda
   limpiarCelda();
   // mensaje de inicio ; nuevo número aleatorio; reiniciar el contador
   condicionesIniciales();
   //deshabilitar botón de nuevo juego
   document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

//verificar el acierto en la jugada
function verificarIntento() {
   let numeroDeUsuario = parseInt(
      document.getElementById("valorUsuario").value
   );
   console.log(intentos);
   if (numeroDeUsuario === numeroSecreto) {
      asignarTextoElemento(
         "p",
         `Acertaste el número secreto en ${intentos} ${
            intentos === 1 ? "intento" : "intentos"
         }`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
   } else if (comparador(numeroSecreto, numeroDeUsuario) === true) {
      asignarTextoElemento("p", "El número secreto es mayor");
      contador();
      limpiarCelda();
   } else {
      asignarTextoElemento("p", "El número secreto es menor");
      contador();
      limpiarCelda();
   }
}

condicionesIniciales();
