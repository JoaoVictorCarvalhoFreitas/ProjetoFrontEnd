
function search() {
    console.log("Pesquisando...");
    var searchbar = document.getElementById("searchbar");
    var clear = document.getElementById("clear");

    searchbar.addEventListener("click",() => {
            searchbar.style.width = "70%";
            clear.style.display = "block";
    });
    searchbar.addEventListener("blur", ()=> {
        searchbar.style.width = "80%";
        clear.style.display = "none";
    });

}

function mostraModal() {
    const modal = document.getElementById("modal-new");
    let innermodal = document.getElementById("inner-modal");
    if(modal.style.display == "none"){
        modal.style.display = "flex";
        modal.style.animation = "slidedown 0.5s ease-in-out";
        innermodal.style.animation = "slidedown 0.5s ease-in-out";

    }
    else{
        innermodal.style.animation = "slideup 0.5s ease-in-out"
        modal.style.animation = "slideup 0.5s ease-in-out"
        setTimeout( () => modal.style.display = "none", 490);

    }
}   






async function cadastrarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById("nomeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const categoria = document.getElementById("categoriaProduto").value;
    const imagemUrl = document.getElementById("imagemUrlProduto").value;

    const corpo = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        imagemUrl: imagemUrl
    };

    try{
        const produto = await fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify(corpo)
            

        }).then(response => {
            console.log('resposta:', response);
            
        })
        .catch(error => {
            console.error('Erro ao salvar produto:', error);
        })
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
}

document.getElementById("produtoForm").addEventListener("submit", cadastrarProduto);



