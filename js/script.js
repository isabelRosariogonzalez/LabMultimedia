/******************************************************
 *  MENU DESPLEGABLE
 *  Al hacer click en el icono del menu, mostrara
 *  cada item de la barra de navegacion
 *****************************************************/
const header = document.querySelector("header");

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};