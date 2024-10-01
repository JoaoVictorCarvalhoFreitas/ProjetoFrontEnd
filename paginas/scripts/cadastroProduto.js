// document.addEventListener('DOMContentLoaded', ()=> {
    
//     let nextId = 1;

//     function salvarProduto(prod) {
//         console.log('salvando produto:', prod);

//         fetch('/api/produtos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(prod)
//         }).then(response => {
//             console.log('resposta:', response);
//             return response.json();
//         }).then(() => {loadProducts();
//         }).catch(error => console.error('Erro ao salvar produto:', error));
//     }

//     function deletarProduto(id) {
//         console.log('deletando produto com o id:', id);
//         fetch(`/api/products/${id}`, {
//             method: 'DELETE'
//         }).then(resp => {
//             console.log('Response:', resp);
//             return response.json();
//         }).then(() => {
//             loadProducts();
//         }).catch(error => console.error('Erro ao excluir produto:', error));
//     }

//     function adProdutoNaTabela(id, nome, preco, imagemUrl) {
//         const tabela = document.getElementById('TabelaProduto');
//         const linha = tabela.insertRow();
//         linha.setAttribute('data-id', id);
//         linha.innerHTML = `
        
//             <td>${id}</td>
//             <td>${nome}</td>
//             <td>R$ ${parseFloat(preco).toFixed(2)}</td>
//             <td><img src="${imagemUrl || 'https://via.placeholder.com/100'}" class="img-fluid" alt="Imagem do Produto"></td>
//             <td id="Idbotoes">
//                 <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${id}">Editar</button>
//                 <button class="btn btn-danger btn-sm delete-btn" data-id="${id}">Excluir</button>
//             </td>
//         `;
//     }

//     function loadProducts() {
//         console.log('carregando produtos');

//         fetch('/api/products')
//             .then(resp => {
//                 console.log('resposta:', resp);
//                 return resp.json();
//             })
//             .then(products => {
//                 const table = document.getElementById('productTable');
//                 table.innerHTML = '';
//                 products.forEach(product => {
//                     addProductToTable(product.id, product.name, product.price, product.imageUrl);
//                     nextId = Math.max(nextId, parseInt(product.id) + 1);
//                 });
//             })
//             .catch(error => console.error('Erro ao carregar produtos:', error));
//     }

//     loadProducts();

//     document.getElementById('productForm').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const id = document.getElementById('productId').value;
//         const name = document.getElementById('productName').value;
//         const price = document.getElementById('productPrice').value;
//         const imageUrl = document.getElementById('productImage').value;

//         const product = {
//             id: id || nextId++, // Incrementa nextId para novos produtos
//             name,
//             price,
//             imageUrl
//         };
        
//         saveProduct(product);
//         document.getElementById('productForm').reset();
//         const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
//         productModal.hide();
//     });

//     document.getElementById('productTable').addEventListener('click', function(event) {
//         const target = event.target;
//         const id = target.getAttribute('data-id');

//         if (target.classList.contains('edit-btn')) {
//             console.log('Editing product with ID:', id);

//             fetch(`/api/products/${id}`)
//                 .then(response => {
//                     console.log('Response:', response);
//                     return response.json();
//                 })
//                 .then(product => {
//                     document.getElementById('productId').value = product.id;
//                     document.getElementById('productName').value = product.name;
//                     document.getElementById('productPrice').value = product.price;
//                     document.getElementById('productImage').value = product.imageUrl;

//                     document.getElementById('productModalLabel').textContent = 'Editar Produto';
//                     const productModal = new bootstrap.Modal(document.getElementById('productModal'));
//                     productModal.show();
//                 })
//                 .catch(error => console.error('Erro ao carregar produto para edição:', error));
//         } else if (target.classList.contains('delete-btn')) {
//             if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
//                 deleteProduct(id);
//             }
//         }
//     });

//     document.getElementById('productImage').addEventListener('input', function(event) {
//         const imageUrl = event.target.value;
//         const img = document.getElementById('imagePreview');

//         if (imageUrl) {
//             img.src = imageUrl;
//             img.style.display = 'block';
//         } else {
//             img.style.display = 'none';
//         }
//     });
// });










// function mostraModal() {
//     const modal = document.getElementById("modal-new");
//     let innermodal = document.getElementById("inner-modal");
//     if(modal.style.display == "none"){
//         modal.style.display = "flex";
//         modal.style.animation = "slidedown 0.5s ease-in-out";
//         innermodal.style.animation = "slidedown 0.5s ease-in-out";

//     }
//     else{
//         innermodal.style.animation = "slideup 0.5s ease-in-out"
//         modal.style.animation = "slideup 0.5s ease-in-out"
//         setTimeout( () => modal.style.display = "none", 490);
//     }



// }  


// async function editarProduto(id){

//     const nome = document.getElementById("nomeProduto").value;
//     const descricao = document.getElementById("descricaoProduto").value;
//     const preco = document.getElementById("precoProduto").value;
//     const categoria = document.getElementById("categoriaProduto").value;
//     const imagemUrl = document.getElementById("imagemUrlProduto").value;

//     const corpo = {
//         nome: nome,
//         descricao: descricao,
//         preco: preco,
//         categoria: categoria,
//         imagemUrl: imagemUrl
//     };

//     await fetch(`/produtos/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json', 
//         },
//         body: JSON.stringify(corpo)
//     }).then(response => {
//         console.log('resposta:', response);
//     })
//     .catch(error => console.error('Erro ao editar produto:', error));

// }

// function criarCardProduto(prod){
//     let img = prod.imagemUrl;
//     let placeholder = 'https://via.placeholder.com/300'

//     img = img ? img : placeholder;
//     return `
// <tr>

//     <td>${prod.id_produto}</td>

//     <td>
//     <img src="${img}" class="card-img-top" alt="Imagem do produto" id="prodImagem">
//     ${prod.nome}
//     </td>
//     <td>${prod.categoria}</td>
//     <td>${prod.quantidade}</td>
//     <td>${prod.preco}</td>
//     <td>
//         <button class="botaoEditar" data-id="${prod.id_produto}">Editar</button>
//         <button class="botaoDeletar" data-id="${prod.id_produto}" >Excluir</button>
//     </td>
//     `
// }   

// document.getElementById("botaoAdicionar").addEventListener("click", (event) => {
//     event.preventDefault();
//     const id = document.querySelectorAll("").innerHTML;

//     if(id == "editar"){
//         console.log("editar: "+ id)
        
//         editarProduto(id);
//     }
//     else{
//         console.log("adicionar")
//         cadastrarProduto();
//     }
// }
// )