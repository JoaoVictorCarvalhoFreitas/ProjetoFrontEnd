function cadastro() {
    mostrarCadastro();
}

function mostrarCadastro() {
    var img = document.getElementById("image");
    var card = document.getElementById("card");


    var login = document.getElementById("login-side");
    var cadastro = document.getElementById("cadastro-side");

    if (login.style.display == "none") {
        cadastro.style.opacity = 0;
        setTimeout(HideSignup,600);
        img.style.borderRadius = "0 1vi 1vi 0"
        img.style.transition = "ease-in-out 0.5s"
        img.style.transform = "translateX(100%)"
        setTimeout(row, 600);
        login.style.opacity = 1;
        setTimeout(ShowLogin, 600);
    } else {
        login.style.opacity = 0;
        setTimeout(HideLogin,600);
        img.style.borderRadius = "1vi 0 0 1vi"
        img.style.transition = "ease-in-out 0.5s"
        img.style.transform = "translateX(-100%)"
        setTimeout(rowreverse, 600);
        cadastro.style.opacity = 0;
        setTimeout(ShowSignup, 600);
    }


}

function HideLogin() {
    var login = document.getElementById("login-side");
    login.style.display = "none";
}

function ShowLogin() {
    var login = document.getElementById("login-side");
    login.style.opacity = 1;
    login.style.display = "flex";
}

function HideSignup() {
    var cadastro = document.getElementById("cadastro-side");
    cadastro.style.display = "none";
}

function ShowSignup() {
    var cadastro = document.getElementById("cadastro-side");
    cadastro.style.opacity = 1;
    cadastro.style.display = "flex";
}

function rowreverse() {
    var img = document.getElementById("image");
    var card = document.getElementById("card");
    img.style.transition = "none"
    card.style.flexDirection = "row-reverse";
    img.style.transform = "translateX(0%)"
}
function row() {
    var img = document.getElementById("image");
    var card = document.getElementById("card");
    img.style.transition = "none"
    card.style.flexDirection = "row";
    img.style.transform = "translateX(0%)"

}



var checkbox1 = document.getElementById("mostrarSenha");

checkbox.addEventListener("click", function() {
    var senha = document.getElementById("senha-login");
    var img = document.getElementById("eye");
    if (checkbox1.checked) {
        senha.type = "text";
        img.src = "src/eye-off-svgrepo-com.svg";
    } else {
        senha.type = "password";
        img.src = "src/eye-svgrepo-com.svg";
    }
});

var checkbox2 = document.getElementById("checkbox");

checkbox.addEventListener("click", function() {
    var senha = document.getElementById("senha-cadastro");
    var confirmsenha = document.getElementById("confirmar-senha");
    if (checkbox2.checked) {
        senha.type = "text";
        confirmsenha.type = "text";
    } else {
        senha.type = "password";
        confirmsenha.type = "password";
    }
});