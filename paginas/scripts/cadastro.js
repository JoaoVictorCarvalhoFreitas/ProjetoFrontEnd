let listaUsuarios = [['admin','123',"Joao1234!"]]







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


