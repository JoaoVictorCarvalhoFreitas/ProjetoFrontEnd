document.addEventListener('DOMContentLoaded', function() {
    let nextId = 1;

    // Função para adicionar um produto à tabela
    function addProductToTable(id, name, price, imageUrl) {
        const table = document.getElementById('productTable');
        const row = table.insertRow();
        row.setAttribute('data-id', id);
        row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>R$ ${parseFloat(price).toFixed(2)}</td>
            <td><img src="${imageUrl || 'https://via.placeholder.com/100'}" class="img-fluid" alt="Imagem do Produto"></td>
            <td>
                <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${id}">Excluir</button>
            </td>
        `;
    }

    // Função para salvar produtos no localStorage
    function saveProductsToLocalStorage() {
        const rows = document.querySelectorAll('#productTable tr');
        const products = [];
        rows.forEach(row => {
            const id = row.getAttribute('data-id');
            const name = row.cells[1].textContent;
            const price = row.cells[2].textContent.replace('R$ ', '').replace(',', '.');
            const imageUrl = row.cells[3].querySelector('img').src;
            products.push({ id, name, price, imageUrl });
        });
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Carregar produtos do localStorage na tabela
    function loadProductsFromLocalStorage() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            addProductToTable(product.id, product.name, product.price, product.imageUrl);
            nextId = Math.max(nextId, parseInt(product.id) + 1);
        });
    }

    loadProductsFromLocalStorage();

    // Manipulação do formulário de produtos
    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const imageUrl = document.getElementById('productImage').value;

        if (id) {
            const row = document.querySelector(`tr[data-id='${id}']`);
            row.cells[1].textContent = name;
            row.cells[2].textContent = `R$ ${parseFloat(price).toFixed(2)}`;
            row.cells[3].querySelector('img').src = imageUrl;
        } else {
            addProductToTable(nextId, name, price, imageUrl);
            nextId++;
        }

        saveProductsToLocalStorage();
        document.getElementById('productForm').reset();
        const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        productModal.hide();
    });

    document.getElementById('productTable').addEventListener('click', function(event) {
        const target = event.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('edit-btn')) {
            const row = target.closest('tr');
            const name = row.cells[1].textContent;
            const price = row.cells[2].textContent.replace('R$ ', '').replace(',', '.');
            const imageUrl = row.cells[3].querySelector('img').src;

            document.getElementById('productId').value = id;
            document.getElementById('productName').value = name;
            document.getElementById('productPrice').value = price;
            document.getElementById('productImage').value = imageUrl;

            document.getElementById('productModalLabel').textContent = 'Editar Produto';
            const productModal = new bootstrap.Modal(document.getElementById('productModal'));
            productModal.show();
        } else if (target.classList.contains('delete-btn')) {
            if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
                const row = target.closest('tr');
                row.remove();
                saveProductsToLocalStorage();
                alert(`Produto com ID ${id} excluído.`);
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
