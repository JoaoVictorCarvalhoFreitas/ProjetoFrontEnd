import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';
import { setupSocketIO } from './socketHandler.mjs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Configura o Socket.IO
const io = setupSocketIO(server);

app.use(express.static(path.join(__dirname, 'paginas')));

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});