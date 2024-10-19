    const email = localStorage.getItem("email")?localStorage.getItem('email'):false
    const senha = localStorage.getItem('senha')? localStorage.getItem('senha'): false
    if (email && senha) {
        document.getElementById("navCardapioDois").style.display = "none"
        document.getElementById("navCardapioUm").style.display = "block"
    } else {
        document.getElementById("navCardapioDois").style.display = "block"
        document.getElementById("navCardapioUm").style.display = "none"
    }