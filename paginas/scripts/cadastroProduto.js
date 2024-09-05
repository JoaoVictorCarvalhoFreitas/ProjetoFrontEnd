document.addEventListener('DOMContentLoaded', function() {
    let nextId = 1;

    function saveProduct(product) {
        console.log('Saving product:', product);

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            console.log('Response:', response);
            return response.json();
        }).then(data => {
            console.log('Save result:', data.message);
            loadProducts();
        }).catch(error => console.error('Erro ao salvar produto:', error));
    }

    function deleteProduct(id) {
        console.log('Deleting product with ID:', id);

        fetch(`/api/products/${id}`, {
            method: 'DELETE'
        }).then(response => {
            console.log('Response:', response);
            return response.json();
        }).then(data => {
            console.log('Delete result:', data.message);
            loadProducts();
        }).catch(error => console.error('Erro ao excluir produto:', error));
    }

    function addProductToTable(id, name, price, imageUrl) {
        const table = document.getElementById('productTable');
        const row = table.insertRow();
        row.setAttribute('data-id', id);
        row.innerHTML = `
        
            <td>${id}</td>
            <td>${name}</td>
            <td>R$ ${parseFloat(price).toFixed(2)}</td>
            <td><img src="${imageUrl || 'https://via.placeholder.com/100'}" class="img-fluid" alt="Imagem do Produto"></td>
            <td id="Idbotoes">
                <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${id}">Excluir</button>
            </td>
        `;
    }

    function loadProducts() {
        console.log('Loading products');

        fetch('/api/products')
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(products => {
                const table = document.getElementById('productTable');
                table.innerHTML = '';
                products.forEach(product => {
                    addProductToTable(product.id, product.name, product.price, product.imageUrl);
                    nextId = Math.max(nextId, parseInt(product.id) + 1);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    loadProducts();

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const imageUrl = document.getElementById('productImage').value;

        const product = {
            id: id || nextId++, // Incrementa nextId para novos produtos
            name,
            price,
            imageUrl
        };
        
        saveProduct(product);
        document.getElementById('productForm').reset();
        const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        productModal.hide();
    });

    document.getElementById('productTable').addEventListener('click', function(event) {
        const target = event.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('edit-btn')) {
            console.log('Editing product with ID:', id);

            fetch(`/api/products/${id}`)
                .then(response => {
                    console.log('Response:', response);
                    return response.json();
                })
                .then(product => {
                    document.getElementById('productId').value = product.id;
                    document.getElementById('productName').value = product.name;
                    document.getElementById('productPrice').value = product.price;
                    document.getElementById('productImage').value = product.imageUrl;

                    document.getElementById('productModalLabel').textContent = 'Editar Produto';
                    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
                    productModal.show();
                })
                .catch(error => console.error('Erro ao carregar produto para edição:', error));
        } else if (target.classList.contains('delete-btn')) {
            if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
                deleteProduct(id);
            }
        }
    });

    document.getElementById('productImage').addEventListener('input', function(event) {
        const imageUrl = event.target.value;
        const img = document.getElementById('imagePreview');

        if (imageUrl) {
            img.src = imageUrl;
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
});
