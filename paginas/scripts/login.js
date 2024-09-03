function cadastro() {
    mostrarCadastro();
}

function mostrarCadastro() {
    var img = document.getElementById("image");
    var card = document.getElementById("card");
    img.style.borderRadius = "1vi 0 0 1vi"
    img.style.transition = "ease-in-out 0.5s"
    
    var login = document.getElementById("login-side");
    var cadastro = document.getElementById("cadastro-side");
    login.style.transition = "ease-in-out 0.5s"
    cadastro.style.transition = "ease-in-out 0.5s"
    
    for (var i = 1; i > 0; i -= 0.1) {
        login.style.opacity -= 1;
    }
    if (login.style.opacity == 0) {
        login.style.display = "none";
    }
    for (var i = 1; i = 1; i += 0.1) {
        cadastro.style.opacity += 1;
    }
    if (cadastro.style.opacity == 1) {
        cadastro.style.display = "flex";
    }
}