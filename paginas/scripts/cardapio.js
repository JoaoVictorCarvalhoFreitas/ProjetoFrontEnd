document.addEventListener('DOMContentLoaded', function() {

    function criarCardProduto(prod) {
        return `
<<<<<<< HEAD
        <div class="col-md-4 mb-4" id="prodDiv1">
            <div class="card card-menu" id="prodDiv2">
                <img src="${prod.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${prod.nome}">
                <div class="card-body">
                    <h5 class="card-title" id="prodNome">${prod.nome}</h5>
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
=======
            <div class="col-md-4 mb-4" id="prodDiv1">
                <div class="card card-menu" id="prodDiv2">
                    a<img src="${prod.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${prod.nome}">
                    <div class="card-body">
                        <h5 class="card-title" id="prodNome">${prod.nome}</h5>
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
>>>>>>> 38fdc9c6ff4bbf3f5d85b7f6e9c13912ae1c9762
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
