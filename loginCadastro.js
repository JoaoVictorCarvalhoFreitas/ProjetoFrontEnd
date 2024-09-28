

// document.addEventListener('DOMContentLoaded', function(event) {

//     event.preventDefault();

//     document.getElementById('botaoEntrar').addEventListener('click',login());

//     document.getElementById('botaoCadastrar').addEventListener('click', cadastrar());

//     async function login(event) {
//         event.preventDefault();


//         const email = document.getElementById('email-login').value;
//         const senha = document.getElementById('senha-login').value;

//         const response = await fetch('/usuarios');
//         const listaUsuarios = await response.json();
//         console.log(listaUsuarios)


//         console.log(usuario)
//         if (usuario == null) {
//             console.log('Usuário não existe');
//             document.getElementById('usuarioInexistente').style.display = 'block';
//             return;
//         }else{
//             if(usuario.senha != senha){
//                 console.log('Senha incorreta');
//                 return false
//             }
//         }


//         console.log('Usuário existe');
        
//     }


//     function verificaUsuario(email,nome) {
//         document.getElementById('campoObrigatorio').style.display = 'none';
//         if (email == '' || nome == '') {
//             document.getElementById('campoObrigatorio').style.display = 'block';
//             return false
//         }

//         for (let i = 0; i < listaUsuarios.length; i++) {
//             if (nome == listaUsuarios[i][0] && email == listaUsuarios[i][1]) {
//                 console.log(listaUsuarios[i][0] +" " +nome)
//                 console.log('Usuário já existe')
//                 document.getElementById('usuarioJaexiste').style.display = 'block';
//                 return false
//             }
//         }

//         console.log('Usuário não existe')
//         document.getElementById('usuarioJaexiste').style.display = 'none';
//         return true
//     }


//     function validaSenha(senha,senha2) {

//         if (senha != senha2) {
//             document.getElementById('senhadiferente').style.display = 'block';
//             return
//         }else{
//             document.getElementById('senhadiferente').style.display = 'none';
//         }

//         const hasUpperCase = /[A-Z]/.test(senha);
//         const hasLowerCase = /[a-z]/.test(senha);
//         const hasNumbers = /\d/.test(senha);
//         const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);

//         if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar ) {
//             console.log('Senha válida');
//             document.getElementById('senhaRegex').style.display = 'none'; 
//             return true;
//         } else {
//             console.log('Senha inválida');
//             document.getElementById('senhaRegex').style.display = 'block';
//             return false
//         }

//     }


//     async function cadastrar(event) {
//         event.preventDefault()


//         const email = document.getElementById('email-cadastro').value;
//         const nome = document.getElementById('nome').value;
//         const sobrenome = document.getElementById('sobrenome').value;
//         const senha = document.getElementById('senha-cadastro').value;
//         const senha2 = document.getElementById('confirmar-senha').value;
        
//         let validasenha = validaSenha(senha,senha2)
        
//         if(!validasenha){
//             return;
//         }
        
//         let validaUsuario = verificaUsuario(email,nome)

//         if(validaUsuario){

//             fetch('/usuarios', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email, nome: nome, sobrenome: sobrenome, senha: senha }),
//             }).then(response => {
//                 console.log('resposta:', response);
//                 return response.json();
//             }).catch(error => console.error('Erro ao salvar usuario:', error));
            
//             document.getElementById('usuarioCadastrado').style.display = 'block';
//             console.log('usuario cadastrado com sucesso')
//         }else{
//             document.getElementById('usuarioCadastrado').style.display = 'none';
//         }

// }

// });