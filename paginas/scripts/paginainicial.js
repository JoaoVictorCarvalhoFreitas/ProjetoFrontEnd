// Nav-bar
const navbar = document.getElementById('navbar');

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

