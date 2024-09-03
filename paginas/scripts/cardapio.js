document.addEventListener('DOMContentLoaded', function() {
    // Função para criar um card de produto
    function createProductCard(product) {
        return `
            <div class="col-md-4">
                <div class="card card-menu">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">R$ ${parseFloat(product.price).toFixed(2)}</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Carregar produtos do localStorage e adicionar ao contêiner
    const menuContainer = document.getElementById('menuContainer');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    menuContainer.innerHTML = products.map(createProductCard).join('');
});
