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
        
        
        console.log('idProduto:', idProduto);
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
            body: JSON.stringify({id_usuario: usuario , id_produto: idProduto,preco: resp.preco}),
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
function mostrarDescricao() {
    const iconButtons = document.querySelectorAll(".arquivo-icon");
    const descricaoProdutos = document.querySelectorAll(".produtoText");

    iconButtons.forEach((element, index) => {
        let buttonActive = true;

        element.addEventListener("click", () => {
            const descricaoProduto = descricaoProdutos[index]; // Relaciona o ícone com a descrição correspondente

            if (!buttonActive) {
                descricaoProduto.style.webkitLineClamp = "2"; // Define a exibição limitada a 2 linhas
                element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M3.204 5h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0L2.451 6.659A1 1 0 0 1 3.204 5z"/>
                    </svg>`; // Seta para baixo
                buttonActive = true;
            } else {
                descricaoProduto.style.webkitLineClamp = "5"; // Mostra mais linhas da descrição
                element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`; // Seta para cima
                buttonActive = false;
            }
        });
    });
}


