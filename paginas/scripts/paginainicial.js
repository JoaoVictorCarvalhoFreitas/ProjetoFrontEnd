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


