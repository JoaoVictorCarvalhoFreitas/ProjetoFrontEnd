//valida se a senha possui os caracteres minimos exigidos
import listaUsuarios from "./listaUsuario.js";


function validaSenha(senha){

    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumbers = /\d/.test(senha);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(senha);

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


function mostrarSenha() {
    var campoSenha = document.getElementById('senha');
    var campoSenha2 = document.getElementById('senha2');

    if (campoSenha.type == 'text') {
        campoSenha.type = 'password';
        campoSenha2.type = 'password';

    } else {
        campoSenha.type = 'text';
        campoSenha2.type = 'text';
    }
}


function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    

    if (senha != senha2) {
        document.getElementById('senhaDiferente').style.display = 'block';
        return;
    }


    if(!validaSenha(senha)){
        return;
    }

    listaUsuarios.push([nome,email,senha])

}