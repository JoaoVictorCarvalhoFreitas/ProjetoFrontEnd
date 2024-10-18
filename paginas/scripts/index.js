    const email = localStorage.getItem("email")?localStorage.getItem('email'):false
    const senha = localStorage.getItem('senha')? localStorage.getItem('senha'): false
    if (email && senha) {
        document.getElementById("navCardapioDois").style.display = "none"
        document.getElementById("navCardapioUm").style.display = "block"
    } else {
        document.getElementById("navCardapioDois").style.display = "block"
        document.getElementById("navCardapioUm").style.display = "none"
    }

// document.addEventListener('DOMContentLoaded', () => {
//     const email = localStorage.getItem("email")
//     const senha = localStorage.getItem('senha')
//     if (email.length && senha.length) {
//         document.getElementById("navCardapioDois").style.display = "block"
//         document.getElementById("navCardapioUm").style.display = "none"
//     } else {
//         document.getElementById("navCardapioDois").style.display = "none"
//         document.getElementById("navCardapioUm").style.display = "block"
//     }

//         const verificaLogin = (event) => {
//             event.preventDefault(); // Impede o comportamento padrão do link
            
            
//         };
    
//         document.getElementById("navCardapio").addEventListener('Click', verificaLogin);
//     });
