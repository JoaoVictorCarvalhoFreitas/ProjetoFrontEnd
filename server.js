import express from 'express'
const port = 3000;

const app = express()

app.use(express.json());
app.use(express.static('paginas')); // Serve arquivos estáticos (HTML, CSS, JS)

// Simulação de banco de dados
let products = [
    { id: '1', name: 'Produto A', price: '29.99', imageUrl: 'https://via.placeholder.com/300' },
    { id: '2', name: 'Produto B', price: '49.99', imageUrl: 'https://via.placeholder.com/300' },
    { id: '3', name: 'Produto C', price: '19.99', imageUrl: 'https://via.placeholder.com/300' }
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
