document.addEventListener('DOMContentLoaded', function() {
    function createProductCard(product) {
        return `
            <div class="col-md-4 mb-4">
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

    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const menuContainer = document.getElementById('menuContainer');
            menuContainer.innerHTML = products.map(createProductCard).join('');
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});
