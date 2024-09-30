
function search() {
    console.log("Pesquisando...");
    var searchbar = document.getElementById("searchbar");
    var clear = document.getElementById("clear");

    searchbar.addEventListener("click",() => {
            searchbar.style.width = "70%";
            clear.style.display = "block";
    });
    searchbar.addEventListener("blur", ()=> {
        searchbar.style.width = "80%";
        clear.style.display = "none";
    });

}

function mostraModal(id) {
    document.getElementById("botaoAdicionar").dataset.id  = id; // ! Adiciona o ID ao botão
    
        const modal = document.getElementById("modal-new");
        let innermodal = document.getElementById("inner-modal");
        if(modal.style.display == "none"){
            modal.style.display = "flex";
            modal.style.animation = "slidedown 0.5s ease-in-out";
            innermodal.style.animation = "slidedown 0.5s ease-in-out";

        }
        else{
            innermodal.style.animation = "slideup 0.5s ease-in-out"
            modal.style.animation = "slideup 0.5s ease-in-out"
            setTimeout( () => modal.style.display = "none", 490);
        }


return id
}  

async function cadastrarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const categoria = document.getElementById("Modal_categoriaProduto").value;
    const imagemUrl = document.getElementById("imagemUrlProduto").value;

    const corpo = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        imagemUrl: imagemUrl
    };

    try{
        const produto = await fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify(corpo)
            

        }).then(response => {
            console.log('resposta:', response);
            
        })
        .catch(error => {
            console.error('Erro ao salvar produto:', error);
        }).then(() => carregarCategorias());
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }


}

function criarCardProduto(prod){
    let img = prod.imagemUrl;
    let placeholder = 'https://via.placeholder.com/300'

    img = img ? img : placeholder;
    return `
<tr>

    <td>${prod.id_produto}</td>

    <td>
    <img src="${img}" class="card-img-top" alt="Imagem do produto" id="prodImagem">
    ${prod.nome}
    </td>
    <td>${prod.categoria}</td>
    <td>${prod.quantidade}</td>
    <td>${prod.preco}</td>
    <td>
        <button class="botaoEditar" data-id="${prod.id_produto}">Editar</button>
        <button class="botaoDeletar" data-id="${prod.id_produto}" >Excluir</button>
    </td>
    `
}   

function carregarProdutos(){
    
    const menuContainer = document.getElementById('TabelaCorpo');
    menuContainer.innerHTML = '';
    fetch('/produtos')
    .then(resp => resp.json())
    .then(produtos => {
        menuContainer.innerHTML = produtos.map(criarCardProduto).join('');
        atribuiBotaoDeletar();
        atribuiBotaoEditar();
    
    }
    )
    .catch(error => console.error('Erro ao carregar produtos:', error));
} 

function carregarCategorias(){

    const categoria = document.getElementById('categoriaProduto').value;
    const menuContainer = document.getElementById('TabelaCorpo');
    menuContainer.innerHTML = '';

    fetch('/produtos')
    .then(resp => resp.json())
    .then(produtos => {   
            menuContainer.innerHTML = produtos.map((prod)=>{

                if(categoria == "todos"){
                    return criarCardProduto(prod);
                }
                if(prod.categoria == categoria){
                    return criarCardProduto(prod);
                }
            }).join('');}
    )
    .catch(error => console.error('Erro ao carregar categorias:', error));
}

async function deletarProduto(id){
    await fetch(`/produtos/${id}`, {
        method: 'DELETE',
    })
    .then(() => carregarCategorias())
    .catch(error => console.error('Erro ao deletar produto:', error));
    location.reload();
}

async function editarProduto(id){

    const nome = document.getElementById("nomeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const categoria = document.getElementById("Modal_categoriaProduto").value;
    const imagemUrl = document.getElementById("imagemUrlProduto").value;

    const corpo = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        imagemUrl: imagemUrl
    };

    await fetch(`/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
        },
        body: JSON.stringify(corpo)
    }).then(response => {
        console.log('resposta:', response);
    })
    .catch(error => console.error('Erro ao editar produto:', error));
    location.reload();
}

function atribuiBotaoDeletar(){
    document.querySelectorAll('.botaoDeletar').forEach(but => {
        but.addEventListener('click', (e) => {
            const idProduto = e.target.dataset.id;
            console.log(`ID do produto a ser deletado: ${idProduto}`);
            deletarProduto(idProduto);
        });
    });
}

function atribuiBotaoEditar(){
    
    document.querySelectorAll('.botaoEditar').forEach(but => {
        but.addEventListener('click', (e) => {
            const id = e.target.dataset.id 
            console.log(`ID do produto a ser editado: ${id}`);
            document.getElementById("tituloModal").innerHTML = "Editar Produto";
            document.getElementById("botaoAdicionar").innerHTML = "editar";            
            mostraModal(id);
        });
    
    });
}


document.addEventListener("DOMContentLoaded", carregarProdutos);

document.getElementById("produtoForm").addEventListener("submit", cadastrarProduto);

document.getElementById("categoriaProduto").addEventListener("change", carregarCategorias);

document.getElementById("botaoAdicionar").addEventListener("click", (event) => {
    event.preventDefault();
    const id = document.getElementById("botaoAdicionar").innerHTML;
    console.log("ID do botão:", id);
    const idProd = document.getElementById("botaoAdicionar").dataset.id;
    console.log("ID do produto:", idProd);

    if(id== "editar"){
        console.log("editar: "+ idProd)
        editarProduto(idProd);
    }
    else{
        console.log("adicionar")
        cadastrarProduto();
    }
}
)

document.getElementById("Produto").addEventListener("click", () => {
    document.getElementById("botaoAdicionar").innerHTML = "Adicionar";
    document.getElementById("tituloModal").innerHTML = "Adicionar Produto";
    mostraModal();
});

document.getElementById("botaoFecharModal").addEventListener("click", () => {
    mostraModal()
})


// document.querySelectorAll('.botaoDeletar').forEach(but => {
//         but.addEventListener('click', (e) => {
//           const idProduto = e.target.dataset.id;
//           console.log(`ID do produto a ser deletado: ${idProduto}`);
//           deletarProduto(idProduto);
//         });
// });