document.addEventListener('DOMContentLoaded', function() {
    function createProductCard(product) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card card-menu">
                    <img src="${product.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nome}</h5>
                        <p class="card-text">R$ ${parseFloat(product.preco).toFixed(2)}</p>
                        <a class="btn btn-primary" href="/index.html"> comprar</a>
                    </div>
                </div>
            </div>
        `;
    }

    fetch('/produtos')
        .then(response => console.log('response:', response) || response.json())
        .then(produtos => {
            const menuContainer = document.getElementById('menuContainer');
            menuContainer.innerHTML = produtos.map(createProductCard).join('');
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

});
