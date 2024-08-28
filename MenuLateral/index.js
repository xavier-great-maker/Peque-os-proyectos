const menu = document.querySelector(".menu-lateral")
const contenido = document.querySelector(".contenido")
menu.addEventListener("click",()=>{
    menu.classList.toggle('cerrado')
    contenido.classList.toggle('pequeño')
})