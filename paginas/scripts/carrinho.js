const carrinho = []

async function carregarProdutos() {
    try {
        document.getElementById("ListaProd").innerHTML = "";
        const usuario = sessionStorage.getItem('id_usuario');
        const produtos = await fetch(`/itensCarrinho/${usuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }).then(resp => resp.json());

        produtos.forEach(prod => {
            carrinho.push(prod);
        } )
        console.log(carrinho);
        produtos.forEach(prod => {
            document.getElementById("ListaProd").innerHTML += criarCardProduto(prod);
        });

        // Adicionar event listener para alterar a quantidade
        adicionarEventosQuantidade();
        adicionaEventoDeleta()
        precoTotal()
        finalizarCompra()
        

        

    } catch (error) {
        console.log("Erro ao carregar produtos", error);
    }
}

function criarCardProduto(prod) {
    let precoTot = prod.preco * prod.quantidade;
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${prod.id_produto}">
        <div>
            <h6>${prod.nome}</h6>
            <small class="text-muted">${prod.descricao}</small>
            <div class="mt-2">
                <input type="number" class="form-control quantidade-produto" data-id="${prod.id_produto}" value="${prod.quantidade}" min="1" style="width: 80px; display: inline-block;">
                <button class="btn btn-danger btn-sm deletar-produto" data-id="${prod.id_produto}" style="margin-left: 10px;">Remover</button>
            </div>
        </div>
        <span class="text-muted preco-produto" data-id="${prod.id_produto}">R$ ${precoTot.toFixed(2)}</span>
    </li>
    `;
}

// Função para adicionar eventos de mudança na quantidade
function adicionarEventosQuantidade() {
    document.querySelectorAll('.quantidade-produto').forEach(input => {
        input.addEventListener('change', async (event) => {
            const id_produto = event.target.getAttribute('data-id');
            const novaQuantidade = event.target.value;
            

            // Atualizar o preço total do produto na interface

            carrinho.forEach(prod => {
                if(prod.id_produto == id_produto){
                    prod.quantidade = novaQuantidade;
                }

                if(prod.id_produto == id_produto){
                    document.querySelector(`.preco-produto[data-id="${id_produto}"]`).innerHTML = `R$ ${(prod.preco * prod.quantidade).toFixed(2)}`;
                }
            })
            precoTotal()
    });
})}

async function precoTotal() {

    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('precototal');
    const frete = document.getElementById('frete');


    let totalProdutos = 0;
    carrinho.forEach(prod => {
        totalProdutos += (prod.preco * prod.quantidade);
    })

    subtotal.innerHTML = `R$ ${totalProdutos.toFixed(2)}`;
    frete.innerHTML = 'R$ 10,00';
    total.innerHTML = `R$ ${(totalProdutos + 10).toFixed(2)}`;



}



function adicionaEventoDeleta(){
    document.querySelectorAll('.deletar-produto').forEach(element => {
        element.addEventListener('click', () => deletaItem(element.getAttribute('data-id')));
    })
}

function deletaItem(id_produto) {
    const id_usuario = sessionStorage.getItem('id_usuario');

    fetch('/deletaItem', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_produto,id_usuario})
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.success) {
            alert('Produto removido do carrinho!');
            carrinho.forEach((e)=>{
                if(e.id_produto == id_produto){
                    console.log(id_produto)
                    console.log(carrinho)

                }
            })
        } else {
            alert('Erro ao remover produto do carrinho');
        }
    }).finally(() => carregarProdutos())
    .catch(error => console.error('Erro ao remover produto do carrinho:err', error));

}


function finalizarCompra() {    

document.getElementById('finalizarCompra').addEventListener('click', async () => {

    const confirmacao =confirm('Deseja finalizar a compra?');

    if (!confirmacao) {
        return;
    }
    await fetch('/finalizarCompra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrinho)
    })
}

)}

carregarProdutos();
