const entrada = document.querySelector(".entrada-datos")

function obtenerNumero(numero){
    entrada.value += numero
}
function calcular(){
    entrada.value = eval(entrada.value)
}
function limpiar(){
    entrada.value = ''
}