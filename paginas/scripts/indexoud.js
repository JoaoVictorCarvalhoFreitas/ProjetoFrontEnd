    const email = sessionStorage.getItem("email")?sessionStorage.getItem('email'):false
    const senha = sessionStorage.getItem('senha')? sessionStorage.getItem('senha'): false
    if (email && senha) {
        document.getElementById("navCardapioDois").style.display = "none"
        document.getElementById("navCardapioUm").style.display = "block"

        document.getElementById("navCarrinho2").style.display = "none"
        document.getElementById("navCarrinho").style.display = "block"

        if(email == "adm"){
            document.getElementById("CadastroProduto").style.display = "none"
            document.getElementById("CadastroProduto2").style.display = "block"
        }else{
            document.getElementById("CadastroProduto").style.display = "block"
            document.getElementById("CadastroProduto2").style.display = "none"
        }





    } else {


        document.getElementById("CadastroProduto").style.display = "block"
        document.getElementById("CadastroProduto2").style.display = "none"

        document.getElementById("navCardapioDois").style.display = "block"
        document.getElementById("navCardapioUm").style.display = "none"


        document.getElementById("navCarrinho2").style.display = "block"
        document.getElementById("navCarrinho").style.display = "none"


    }