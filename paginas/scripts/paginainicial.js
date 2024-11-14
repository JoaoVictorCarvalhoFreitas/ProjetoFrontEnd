const navbar1 = document.getElementById('navbar');

// Função para mostrar a navbar
function showNavbar() {
    navbar.classList.add('show');
}

// Altera o estilo da navbar ao rolar a página
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Limite para a mudança de cor
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mostra a navbar ao mover o mouse perto do topo da página
window.addEventListener('mousemove', (event) => {
    if (event.clientY < 50) {
        showNavbar();
    }
});

function showNavbar() {
    navbar.classList.add('show');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.getElementById('logo-link').addEventListener('click', (event) => {
    event.preventDefault();
    scrollToTop();
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
        showNavbar();
    }
});

window.addEventListener('mousemove', (event) => {
    if (event.clientY < 50) {
        showNavbar();
    }
});

window.onload = showNavbar;

//Menu opções
function showMenu(menuId) {
    // Oculta todos os menus
    const menus = document.querySelectorAll('.menu-conteudo');
    menus.forEach(menu => menu.style.display = 'none');

    // Exibe o menu selecionado
    const selectedMenu = document.getElementById(menuId);
    selectedMenu.style.display = 'grid';

    // Remove a classe 'active' de todos os botões
    const buttons = document.querySelectorAll('.menu-buttons button');
    buttons.forEach(button => button.classList.remove('active'));

    // Adiciona a classe 'active' ao botão clicado
    const activeButton = document.querySelector(`.menu-buttons button[onclick="showMenu('${menuId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}



const email = sessionStorage.getItem("email")?sessionStorage.getItem('email'):false
const senha = sessionStorage.getItem('senha')? sessionStorage.getItem('senha'): false

if (email && senha) {
    document.getElementById("barra2").style.display = "none"
    document.getElementById("barra1").style.display = "flex"   
    if(email == "adm"){
        document.getElementById("cadastrarProduto").style.display = "flex"
    }else{
        document.getElementById("cadastrarProduto").style.display = "none"
    }

} else {

    document.getElementById("barra2").style.display = "flex"
    document.getElementById("barra1").style.display = "none" 
}

function limparLocalStorage(){
    sessionStorage.clear()
    
    location.reload()

}



