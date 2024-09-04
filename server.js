import express from 'express'
const port = 3000;

const app = express()

app.use(express.json());
app.use(express.static('paginas')); // Serve arquivos estáticos (HTML, CSS, JS)

//produtos iniciais
let products = [
    { id: '1', name: 'café expresso ', price: '9.99', imageUrl: 'https://mundoemrevista.com.br/wp-content/uploads/2024/04/cafe-espresso-3-otimas-opcoes-de-maquinas-por-menos-de-r-500.webp' },
    { id: '2', name: 'capuccino', price: '19.99', imageUrl: 'https://img.freepik.com/fotos-gratis/deliciosa-xicara-de-cafe-de-qualidade_23-2150691369.jpg?w=740&t=st=1725488811~exp=1725489411~hmac=5d9f0d365ff2d452e6d291085f0e8353b728070c80e0d0ec29a598bb42e3a8a8' },
    { id: '3', name: 'Café com depressão', price: '999.99', imageUrl: 'https://s2-techtudo.glbimg.com/twoewJmwpMgtGPcRPP8SxFlDVmM=/0x0:695x393/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/P/f/y52r4ySZWLkJjEhKLhgw/2014-11-14-java-logo.jpg' }
];

// API para obter todos os produtos
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API para obter um produto pelo ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// API para adicionar ou atualizar um produto
app.post('/api/products', (req, res) => {
    const { id, name, price, imageUrl } = req.body;
    const existingProductIndex = products.findIndex(product => product.id === id);

    if (existingProductIndex > -1) {
        // Atualizar produto existente
        products[existingProductIndex] = { id, name, price, imageUrl };
    } else {
        // Adicionar novo produto
        products.push({ id, name, price, imageUrl });
    }

    res.status(200).json({ message: 'Produto salvo com sucesso!' });
});

// API para excluir um produto pelo ID
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex > -1) {
        products.splice(productIndex, 1);
        res.status(200).json({ message: 'Produto excluído com sucesso!' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
