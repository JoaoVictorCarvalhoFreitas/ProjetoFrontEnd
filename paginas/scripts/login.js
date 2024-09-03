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
    login.style.opacity = 0;
    setTimeout(HideLogin,600);
    cadastro.style.opacity = 0;
    cadastro.style.display = "flex";
    setTimeout(ShowSignup, 600);
    
}

function HideLogin() {
    var login = document.getElementById("login-side");
    login.style.display = "none";
}


function ShowSignup() {
    var cadastro = document.getElementById("cadastro-side");
    cadastro.style.opacity = 1;
}

var checkbox = document.getElementById("mostrarSenha");

checkbox.addEventListener("click", function() {
    var senha = document.getElementById("senha-login");
    var img = document.getElementById("eye");
    if (checkbox.checked) {
        senha.type = "text";
        img.src = "src/eye-off-svgrepo-com.svg";
    } else {
        senha.type = "password";
        img.src = "src/eye-svgrepo-com.svg";
    }
});
