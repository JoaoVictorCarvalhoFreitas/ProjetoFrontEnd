document.addEventListener('DOMContentLoaded', ()=> {
// Função para adicionar produto ao carrinho
function adEventList(){
    document.querySelectorAll('.comprar-btn').forEach(element => {
        element.addEventListener('click', () => adicionaCarrinhoProdutos(element));
    });
}


    const adicionaCarrinhoProdutos = async (element) => {
        console.log('Adicionando produto ao carrinho');
        const usuario = sessionStorage.getItem('id_usuario');
        const idProduto = element.getAttribute('data-id');
        const quantidade = element.parentElement.querySelector('#prodQuantidade').value;
        
        console.log('idProduto:', idProduto);
        console.log('quantidade:', quantidade);
        console.log('usuario:', usuario);
    try{

        const resp = await fetch(`produtos/${idProduto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            .then(resp => resp.json());
            console.log(resp);

            

        

        fetch('/adicionaCarrinho', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({id_usuario: usuario , id_produto: idProduto, quantidade: quantidade, preco: resp.preco}),
         })
            .then(resp => resp.json())
            .then(data => {console.log("data"+ data)})
            .catch(error => console.error('Erro ao adicionar produto ao carrinho:', error));
    }catch(error){
        console.log(error);
    }}

    function criarCardProduto(prod) {
        return `
        <div class="col-md-4 mb-4" id="prodDiv1">
            <div class="card card-menu" id="prodDiv2" >
                <img src="${prod.imagemUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${prod.nome}">
                <div class="card-body">
                    <h5 class="card-title" id="prodNome" >${prod.nome}</h5>
                    <p class="produtoText">${prod.descricao}</p>

                    <div class="arquivo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                    
                    <p class="card-text" id="prodPreco">R$ ${parseFloat(prod.preco).toFixed(2)}</p>
                    <div class="precoComprar">
                        <input id="prodQuantidade" type="number" class="form-control" value="1" min="1" style="margin-right: 5%;">
                        <button class="btn btn-primary comprar-btn" id="comprar" data-id="${prod.id_produto}" href="#"><h5>Comprar</h5></button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    const carregarProdutos = async () => {
        try {
            const resp = await fetch('/produtos');
            const produtos = await resp.json();
            
            const menuContainer = document.getElementById('menuContainer');
            menuContainer.innerHTML = produtos.map(criarCardProduto).join('');
            // Agora que os produtos foram carregados, adicionar os event listeners
            adEventList();
            mostrarDescricao();

        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    carregarProdutos();

});







// Função para mostrar a descrição

function mostrarDescricao(){

    const iconButton = document.querySelectorAll(".arquivo-icon");
    const descricaoProduto = document.querySelectorAll(".produtoText");

    iconButton.forEach((element) => {
        console.log(descricaoProduto)
        console.log(iconButton)
        let buttonActive = true;
        element.addEventListener("click", () => {
            if (buttonActive == false) {
                descricaoProduto.style = "-webkit-line-clamp: 2;"
                // Link do icon da seta
                iconButton.forEach( (element) => {element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;
                    buttonActive = true;})
                
            } else {
                descricaoProduto.style = "-webkit-line-clamp: 5;"
                // Link do icon da seta
                iconButton.forEach( (element) => {element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;
                    buttonActive = false;})
            }
            
        })
})

// iconButton.addEventListener("click", () =>{
//     if (buttonActive == false) {
//         descricaoProduto.classList.remove("produtoText")
//         // Link do icon da seta
//         iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
//         <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
//         </svg>`;
//         buttonActive = true;
//     } else {
//         descricaoProduto.classList.add("produtoText")
//         // Link do icon da seta
//         iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
//         <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
//         </svg>`;
//         buttonActive = false;
//     }
// });

}


