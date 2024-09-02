let listaUsuarios = [['admin','123',"Joao1234!"]]

function verificaUsuario(email,nome) {

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


function mostrarSenha() {
    const campoSenha = document.getElementById('senha');
    const campoSenha2 = document.getElementById('senha2');

    if (campoSenha.type == 'text') {
        campoSenha.type = 'password';
        campoSenha2.type = 'password';

    } else {
        campoSenha.type = 'text';
        campoSenha2.type = 'text';
    }

    console.log('mostrar senha')
}


function cadastrar() {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    
    let validaSenh = validaSenha(senha,senha2)
    
    if(!validaSenh){
        return;
    }
    
    let validaUsuario = verificaUsuario(email,nome)
    console.log("valida usuario: "+validaUsuario)
    
    if(validaUsuario){
        listaUsuarios.push([nome,email,senha])
        console.log(listaUsuarios)
    }else{
        return;
    }

}
