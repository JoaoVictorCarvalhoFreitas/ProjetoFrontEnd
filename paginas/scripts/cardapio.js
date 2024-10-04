document.addEventListener('DOMContentLoaded', function() {

    function criarCardProduto(prod) {
        return `
            <div class="col-md-4 mb-4" id="prodDiv1">
                <div class="card card-menu" id="prodDiv2">
                    <img src="${prod.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${prod.nome}">
                    <div class="card-body">
                        <h5 class="card-title produtoText" id="prodNome">${prod.nome}</h5>
                        <p class=produtoText>Descrição</p>
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
