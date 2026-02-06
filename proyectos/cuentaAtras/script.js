// Estas son las tres variables principales con las cuales vamos a ir jugando en el resto de funciones
var tiempoInicial = 60000;
var tiempoRestante = tiempoInicial; // Esta variable nos va a permitir  después jugar con ella para parar, pausar, resetear...
var intervalo = null;

// Esta función sirve para dar formato a los números que se van a mostrar, MM:SS.D
function formatearTiempo(ms) {
    var totalDecimas = Math.floor(ms / 100);
    var totalSegundos = Math.floor(totalDecimas / 10);
    var decima = totalDecimas % 10;

    var minutos = Math.floor(totalSegundos / 60);
    var segundos = totalSegundos % 60;

    return minutos.toString().padStart(2, '0') + ":" +
           segundos.toString().padStart(2, '0') + "." +
           decima;
}

// Esta función sirve para que se actualicen los número en la pantalla
function actualizarPantalla() {
    document.getElementById("cuenta").textContent = formatearTiempo(tiempoRestante);
}

// Esta funcion cerrara la ventana cuando la cuenta llegue a 0
function marchaAtras() {
    tiempoRestante -= 100;

    if (tiempoRestante <= 0) {
        tiempoRestante = 0;
        actualizarPantalla();
        clearInterval(intervalo);
        intervalo = null;
        window.close();
        return;
    }

    actualizarPantalla();
}

// Inicia la cuenta atrás
function iniciar() {
    tiempoRestante = tiempoInicial;
    actualizarPantalla();
    if (intervalo !== null) clearInterval(intervalo);
    intervalo = setInterval(marchaAtras, 100);
}

// Función para pausar el temporizador
function pausar() {
    clearInterval(intervalo);
    intervalo = null;
}

// Función para continuar el temporizador si se ha pausado.
function continuar() {
    if (intervalo === null && tiempoRestante > 0) {
        intervalo = setInterval(marchaAtras, 100);
    }
}

// Función para el botton de restear
function resetear() {
    pausar();
    tiempoRestante = tiempoInicial; // Esta es la clave, iguala el tiempo al tiempo inicial, lo resetea
    actualizarPantalla();
}

// Función para cambiar el temporizador 
function aplicarTiempo() {
    var valor = parseInt(document.getElementById("tiempoUsuario").value);
    if (!isNaN(valor) && valor > 0) {
        tiempoInicial = valor * 1000;
        tiempoRestante = tiempoInicial;
        actualizarPantalla();
    }
}
