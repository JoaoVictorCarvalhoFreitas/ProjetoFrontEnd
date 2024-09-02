import express from 'express'



const app = express();

app.use(express.static('paginas'));

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000`);
});