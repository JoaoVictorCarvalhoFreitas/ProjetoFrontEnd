// lista de usuarios [nome,email,senha]
var listaUsuario = [['joao','joao@joao','1234']]


//troca entre a aba login e cadastro
function mostrarLogin_Cadastro() {

    
    var img = document.getElementById("image");
    var card = document.getElementById("card");


    var login = document.getElementById("login-side");
    var cadastro = document.getElementById("cadastro-side");
    
    

    if (login.style.display == "none") {
        cadastro.style.opacity = 0;
        setTimeout(HideCadastro,600);
        img.style.borderRadius = "0 1vi 1vi 0"
        img.style.transition = "ease-in 0.5s"
        img.style.transform = "translateX(100%)"
        setTimeout(row, 600);
        login.style.opacity = 1;
        setTimeout(ShowLogin, 600);
    } else {
        login.style.opacity = 0;
        setTimeout(HideLogin,600);
        img.style.borderRadius = "1vi 0 0 1vi"
        img.style.transition = "ease-in 0.5s"
        img.style.transform = "translateX(-100%)"
        setTimeout(rowreverse, 600);
        cadastro.style.opacity = 0;
        setTimeout(ShowCadastro, 600);
    }


}

//esconde a aba login
function HideLogin() {
    var login = document.getElementById("login-side");
    login.style.display = "none";
}

//mostra a aba login
function ShowLogin() {
    var login = document.getElementById("login-side");
    login.style.opacity = 1;
    login.style.display = "flex";
}


function HideCadastro() {
    var cadastro = document.getElementById("cadastro-side");
    cadastro.style.display = "none";
}

function ShowCadastro() {
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


function mostrarSenhaLogin() {
    var checkbox1 = document.getElementById("mostrarSenha");

        var senha = document.getElementById("senha-login");
        var img = document.getElementById("eye");
        if (checkbox1.checked) {
            senha.type = "text";
            img.src = "src/eye-off-svgrepo-com.svg";
        } else {
            senha.type = "password";
            img.src = "src/eye-svgrepo-com.svg";
        }
}

function mostrarSenhaSignup() {
    var checkbox2 = document.getElementById("checkbox");
        var senha = document.getElementById("senha-cadastro");
        var confirmsenha = document.getElementById("confirmar-senha");
        if (checkbox2.checked) {
            senha.type = "text";
            confirmsenha.type = "text";
        } else {
            senha.type = "password";
            confirmsenha.type = "password";
        }
}




function logar(event){

    
    const email = document.getElementById('email-login').value
    const senha = document.getElementById('senha-login').value

    listaUsuario.forEach(usuario => {
        if(usuario[1] == email && usuario[2] == senha){
            return true
        }else{
            
            event.preventDefault()
        }
        
    }
);
    return false

}


// Codigo para o cadastro de usuarios

//validacao de usuario existente ou nao
function verificaUsuario(email,nome) {
    document.getElementById('campoObrigatorio').style.display = 'none';
    if (email == '' || nome == '') {
        document.getElementById('campoObrigatorio').style.display = 'block';
        return false
    }

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (nome == listaUsuarios[i][0] && email == listaUsuarios[i][1]) {
            console.log(listaUsuarios[i][0] +" " +nome)
            console.log('Usuário já existe')
            document.getElementById('usuarioJaexiste').style.display = 'block';
            return false
        }
    }

    console.log('Usuário não existe')
    document.getElementById('usuarioJaexiste').style.display = 'none';
    return true
}

//validacao para caso as senhas seja diferentes ou nao tenham os caracteres necessarios
function validaSenha(senha,senha2) {

    if (senha != senha2) {
        document.getElementById('senhadiferente').style.display = 'block';
        return
    }else{
        document.getElementById('senhadiferente').style.display = 'none';
    }

    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumbers = /\d/.test(senha);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);

    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar ) {
        console.log('Senha válida');
        document.getElementById('senhaRegex').style.display = 'none'; 
        return true;
    } else {
        console.log('Senha inválida');
        document.getElementById('senhaRegex').style.display = 'block';
        return false
    }

}


//realiza as validações anteriores e da um push desse usuario na lista de usuarios
function cadastrar(event) {


    const email = document.getElementById('email-cadastro').value;
    const nome = document.getElementById('nome-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    const senha2 = document.getElementById('confirmar-senha').value;
    
    let validasenha = validaSenha(senha,senha2)
    
    if(!validasenha){
        return;
    }
    
    let validaUsuario = verificaUsuario(email,nome)

    if(validaUsuario){
        document.getElementById('usuarioCadastrado').style.display = 'block';
        listaUsuarios.push([nome,email,senha])
        console.log('usuario cadastrado com sucesso')
    }else{
        document.getElementById('usuarioCadastrado').style.display = 'none';
        event.preventDefault()
    }

}



