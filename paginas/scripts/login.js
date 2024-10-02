//troca entre a aba login e cadastro

document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();

    const requisitos = document.getElementById("requisitos");


    document.getElementById("senhaCadastro").addEventListener("focus", ()=> {
        requisitos.style.display = "block";
    });

    document.getElementById("requisitos").addEventListener("blur", ()=> {
        requisitos.style.display = "none";
    });

    document.getElementById("mostrarLogin_Cadastro").addEventListener("click", mostrarLogin_Cadastro);

    document.getElementById("mostrarSenha").addEventListener("click", mostrarSenhaLogin);

    document.getElementById("checkbox_senha").addEventListener("click", mostrarSenhaSignup);
    
    document.getElementById("botaoEntrar").addEventListener("click", login);

    document.getElementById("botaoCadastrar").addEventListener("click", cadastro);
    


    function mostrarLogin_Cadastro() {

        
        var img = document.getElementById("image");
        var login = document.getElementById("login-side");
        var cadastro = document.getElementById("cadastro-side");
        
        if (login.style.display == "none") {
            cadastro.style.opacity = 0;
            setTimeout(HideCadastro,600);
            img.style.borderRadius = "0 1vi 1vi 0"
            img.style.transition = "ease-out 0.5s"
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
        const checkbox1 = document.getElementById("mostrarSenha");

            const senha = document.getElementById("senhaLogin")
            const img = document.getElementById("eye");



            if (checkbox1.checked) {
                console.log(senha.type)
                senha.type = "text";
                img.src = "src/eye-off-svgrepo-com.svg";
            } else {
                senha.type = "password";
                img.src = "src/eye-svgrepo-com.svg";
            }
    }

    function mostrarSenhaSignup() {
        const checkbox2 = document.getElementById("checkbox_senha");
            const senha = document.getElementById("senhaCadastro");
            const confirmsenha = document.getElementById("confirmarSenha");
            if (checkbox2.checked) {
                senha.type = "text";
                confirmsenha.type = "text";
            } else {
                senha.type = "password";
                confirmsenha.type = "password";
            }
    }




});


async function login(event) {
    event.preventDefault();


    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;


    try{
        const usuarioBD = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify({email: email, senha: senha})
        })      
        .then(resp => {
            if(resp.status == 404){
                alert("Usuario não encontrado")
                return;
                
            }else if(resp.status == 200){
                alert("Usuario logado com sucesso");
            }
            console.log("Usuario logado com sucesso: ")})
        .catch(error => console.log(error));
    }catch(error){
        console.log(error)
    }
}

async function cadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if(senha != confirmarSenha){
        alert('As senhas não coincidem');
        return;
    }
    try{
        const usuarioBD = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify({nome: nome, email: email, senha: senha})
        })    
        .then(resp => alert(resp) )
        .catch(error => console.log(error));
        location.reload();
    }catch(error){
        console.log(error)
    }
}
