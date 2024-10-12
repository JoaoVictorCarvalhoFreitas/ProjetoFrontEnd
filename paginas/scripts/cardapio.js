document.addEventListener('DOMContentLoaded', function() {

    function criarCardProduto(prod) {
        return `
            <div class="container my-5">
        <h1 class="text-center mb-4">Cardápio de Produtos</h1>
        <div class="row" id="menuContainer">

            <div class="iconMenu">
                <a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" color="black" class="bi bi-house-fill" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                  </svg>
                </a>
                
                <a href="cadastro.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" color="black" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                  </svg>
                </a>
            </div>

            <div class="col-md-4 mb-4" id="prodDiv1">
                <div class="card card-menu" id="prodDiv2">
                    a<img src="${prod.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${prod.nome}">
                    <div class="card-body">
                        <h5 class="card-title produtoText" id="prodNome">${prod.nome}</h5>
                        <p class="desactiveText produtoText">Descrição</p>

                        <div class="arquivo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </div>
                        
                        <p class="card-text" id="prodPreco">R$ ${parseFloat(prod.preco).toFixed(2)}</p>
                        <div class="precoComprar">
                            <input id="prodQuantidade" type="number" class="form-control" value="1" min="1" style="margin-right: 5%;">
                            <a class="btn btn-primary" id="comprar" href="#"><h5>Comprar</h5></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    try{
        fetch('/produtos')
            .then(resp => resp.json() || console.log("resposta:" + resp)  )
            .then(produtos => {
                const menuContainer = document.getElementById('menuContainer');
                menuContainer.innerHTML = produtos.map(criarCardProduto).join('');
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }catch{
        console.log("Erro ao carregar produtos")
    }
    
});

// Função para mostrar a descrição
let descricaoProduto = window.document.querySelector(".desactiveText");
let iconButton = window.document.querySelector(".arquivo-icon");
let buttonActive = false;
iconButton.addEventListener("click", function() {
    if (buttonActive === false) {
        descricaoProduto.classList.remove("produtoText")
        // Link do icon da seta
        iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>`;
        buttonActive = true;
    } else {
        descricaoProduto.classList.add("produtoText")
        // Link do icon da seta
        iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>`;
        buttonActive = false;
    }
});
