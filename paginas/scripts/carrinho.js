

async function carregarProdutos() {
    try {
        document.getElementById("ListaProd").innerHTML = "";
        const usuario = localStorage.getItem('id_usuario');
        const produtos = await fetch(`/itensCarrinho/${usuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }).then(resp => resp.json());

        produtos.forEach(prod => {
            document.getElementById("ListaProd").innerHTML += criarCardProduto(prod);
        });

        // Adicionar event listener para alterar a quantidade
        adicionarEventosQuantidade();
        adicionaEventoDeleta()

        

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
            const produto = await fetch(`/produtos/${id_produto}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            }).then(resp => resp.json());

            // Recalcular o preço total com base na nova quantidade
            const novoPrecoTotal = produto.preco * novaQuantidade;

            // Atualizar o elemento que mostra o preço total
            document.querySelector(`.preco-produto[data-id="${id_produto}"]`).textContent = `R$ ${novoPrecoTotal.toFixed(2)}`;

            // Opcional: Se quiser salvar a nova quantidade no servidor
            try {
                await fetch('/atualizaQuantidade', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({  id_produto, quantidade: novaQuantidade })
                });
            } catch (error) {
                console.error('Erro ao atualizar a quantidade:', error);
            }
        });
    });
}



function adicionaEventoDeleta(){
    document.querySelectorAll('.deletar-produto').forEach(element => {
        element.addEventListener('click', () => deletaItem(element.getAttribute('data-id')));
    })
}

function deletaItem(id_produto) {
    const id_usuario = localStorage.getItem('id_usuario');

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
        } else {
            alert('Erro ao remover produto do carrinho');
        }
    }).finally(() => carregarProdutos())
    .catch(error => console.error('Erro ao remover produto do carrinho:err', error));

}

carregarProdutos();
